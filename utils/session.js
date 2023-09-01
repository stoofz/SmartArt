const setSession = async (user) => {

  await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(user.email),
    headers:
      { 'Content-Type': 'application/json' }
  }).then(res => res.json()).then(customerId => {

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('sessionId', customerId);
//      window.sessionStorage.getItem('sessionId');
    }
  });
}

const clearSession = () => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem('sessionId');
  }
}

export { setSession, clearSession };
