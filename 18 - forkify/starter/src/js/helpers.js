import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = s => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}; // This setTimeout function, returns a new promise that will use the reject() function to reject this promise after the designated time has elapsed.

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`); // This throws an error that will propegate to the nearest catch block.
    return data; // We return data from this function, which will be the resolved promise of this API call.
  } catch (err) {
    throw err; // This will now re-throw this error, and will be handled by the next nearest catch block within environment where this function is called.
  }
};
