import { useState } from 'react';
import { createContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { auth, firebase } from './services/firebase';
import { Home } from "./pages/Home";
import { NewRoom } from './pages/NewRoom';

export const AuthContext = createContext({} as any);
function App() {
  const [user, setUser] = useState();

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {
      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || photoURL) {
          throw new Error('Missing information from Google account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
    });
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Route path="/" component={Home} exact />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
