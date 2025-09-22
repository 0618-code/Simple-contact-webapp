'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

interface ContactData {
  name: string;
  phone: string;
}

interface ContactResult {
  data?: ContactData;
  error?: string;
}

async function addContact(formData: FormData): Promise<ContactResult> {
  const nameValue = formData.get('name');
  const phoneValue = formData.get('phone');

  // Validate form data
  if (!nameValue || nameValue === '' || !phoneValue || phoneValue === '') {
    return { error: 'Name and phone number are required.' };
  }

  const name: string = nameValue.toString();
  const phone: string = phoneValue.toString();

  // Get the logged-in user's ID
  const { userId } = await auth();

  // Check if a user is authenticated
  if (!userId) {
    return { error: 'You must be logged in to add a contact.' };
  }

  try {
    // Check if a contact with the same phone number already exists for the user
    const existingContact = await db.contact.findFirst({
      where: {
        userId,
        phoneNumber: phone, // Changed from 'phone' to 'phoneNumber'
      },
    });

    let contactData: ContactData;

    if (existingContact) {
      // Update the existing contact
      const updatedContact = await db.contact.update({
        where: { id: existingContact.id },
        data: {
          name,
          phoneNumber: phone, // Also update this field
        },
      });

      contactData = {
        name: updatedContact.name,
        phone: updatedContact.phoneNumber, // Changed to 'phoneNumber'
      };
    } else {
      // Create a new contact
      const createdContact = await db.contact.create({
        data: {
          name,
          phoneNumber: phone, // Changed to 'phoneNumber'
          userId,
        },
      });

      contactData = {
        name: createdContact.name,
        phone: createdContact.phoneNumber, // Changed to 'phoneNumber'
      };
    }

    revalidatePath('/contacts');

    return { data: contactData };
  } catch (error) {
    console.error('Error adding/updating contact:', error);
    return { error: 'An unexpected error occurred while processing your request.' };
  }
}

export default addContact;