'use server';

export async function subscribeToNewsletter(email: string) {
  if (!email) {
    return { success: false, error: 'Email is required' };
  }

  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error('BREVO_API_KEY is not defined');
    return { success: false, error: 'Configuration error' };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: [9],
        updateEnabled: true,
      }),
    });

    // 201: Created, 204: Updated
    if (response.status === 201 || response.status === 204) {
      return { success: true };
    }

    const data = await response.json();
    console.error('Brevo API Error:', data);

    // If it's a 400 but implies they are already there (though updateEnabled should handle this),
    // we fallback to success to be user-friendly, unless it's a validation error.
    // However, with updateEnabled: true, standard "already exists" shouldn't happen as 400.
    // Real invalid emails will trigger 400.

    return { success: false, error: 'Failed to subscribe' };

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { success: false, error: 'Internal server error' };
  }
}
