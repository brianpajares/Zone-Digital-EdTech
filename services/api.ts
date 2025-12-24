import { CartItem, Lead } from '../types';

interface ExtendedLead extends Lead {
  bookId: string;
  type: 'pdf' | 'audio';
}

/**
 * GOOGLE SHEETS INTEGRATION GUIDE:
 * 
 * 1. Create a Google Sheet with headers: Timestamp, Name, Email, Interest, Type, BookID.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this code in Code.gs:
 * 
 *    function doPost(e) {
 *      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *      var data = JSON.parse(e.postData.contents);
 *      sheet.appendRow([new Date(), data.name, data.email, data.interest, data.type, data.bookId]);
 *      
 *      // Email Automation Logic
 *      if(data.type === 'pdf') {
 *        MailApp.sendEmail({
 *          to: data.email,
 *          subject: "Tu Capítulo Gratis de Zone-Digital EdTech",
 *          body: "Hola " + data.name + ",\n\nAquí tienes tu capítulo de " + data.bookId + "..."
 *        });
 *      }
 *      
 *      return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
 *    }
 * 
 * 4. Deploy > New Deployment > Web App > Who has access: "Anyone".
 * 5. Use the provided URL as your endpoint below.
 */

const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE"; 

export const submitLead = async (leadData: ExtendedLead): Promise<{ success: boolean; message: string }> => {
  // In production, uncomment the fetch call:
  /*
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Important for Google Apps Script
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });
    return { success: true, message: 'Lead saved' };
  } catch (e) {
    console.error(e);
    return { success: false, message: 'Error' };
  }
  */

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('API Call: Lead Saved to Google Sheets', leadData);
      
      if (leadData.type === 'audio') {
        resolve({ success: true, message: 'Redirigiendo a Spotify...' });
      } else {
        resolve({ success: true, message: '¡Gracias! Revisa tu correo en 5 minutos.' });
      }
    }, 1000);
  });
};

/**
 * STRIPE CHECKOUT INTEGRATION:
 * This sends the cart to your backend (Node.js/Python), which then calls Stripe API:
 * stripe.checkout.sessions.create({ ... })
 */
export const createCheckoutSession = async (cart: CartItem[]): Promise<{ url: string } | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('API Call: Creating Stripe Session for', cart);
      resolve({ url: '#checkout-success-simulation' });
    }, 1500);
  });
};

export const triggerAbandonedCart = (cart: CartItem[]) => {
  if (cart.length === 0) return;
  // Use navigator.sendBeacon for reliability on page unload
  const blob = new Blob([JSON.stringify({ cart, timestamp: new Date().toISOString() })], { type: 'application/json' });
  // navigator.sendBeacon('/api/abandoned', blob); 
  console.log('Tracker: Abandoned Cart Event');
};