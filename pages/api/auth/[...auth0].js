import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { createUser } from 'utils/db';

const afterCallback = async (req, res, session, state) => {
 // console.log(session)
  try {
    await createUser(session.user);
  } catch (error) {
    console.error(error);
  }
  return session;
}

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
})
