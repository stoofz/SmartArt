import { useEffect, useState } from 'react';

const setSession = async (user) => {

  await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(user.email),
    headers:
      { 'Content-Type': 'application/json' }
  }).then(res => res.json()).then(customerId => {

    if (typeof window !== 'undefined') {
     // window.sessionStorage.setItem('sessionId', customerId);
    //  window.sessionStorage.getItem('sessionId');
      document.cookie = `sessionId=${customerId}; path = /`;

    }
  });
}

const clearSession = () => {
  if (typeof window !== 'undefined') {
   // window.sessionStorage.removeItem('sessionId');
    document.cookie = 'sessionId=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}


// Frontend hook to get the sessionId from the cookie
const useSessionId = () => {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Find if there is a cookie with the field 'sessionId='
    const sessionIdCookie = document.cookie.split('; ').find((cookie) => cookie.startsWith('sessionId='));

    // If there is a cookie, set the sessionIdValue to the value of the cookie else set it to null
    const sessionIdValue = sessionIdCookie ? sessionIdCookie.split('=')[1] : null;
    setSessionId(sessionIdValue);
  }, []);

  return Number(sessionId);
};

export { setSession, clearSession, useSessionId };
