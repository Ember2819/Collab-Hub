import React, { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Zap, User, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegistering) {
        // 1. Check if username is taken
        const usernameRef = doc(db, 'profiles', username.toLowerCase().trim());
        const usernameSnap = await getDoc(usernameRef);
        
        if (usernameSnap.exists()) {
          throw new Error("Username already taken!");
        }

        // 2. Create the user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 3. Create Profile (for searching) and User Data (for settings)
        await setDoc(doc(db, 'profiles', username.toLowerCase().trim()), { uid: user.uid });
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          username: username.trim(),
          email: email,
          friends: [],
          friendRequests: []
        });

      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="max-w-md w-full bg-[#121212] p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20 mb-4">
            <Zap size={32} className="text-white" fill="white" />
          </div>
          <h2 className="text-3xl font-black tracking-tighter">COLLAB<span className="text-blue-500">HUB</span></h2>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {isRegistering && (
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input 
                required
                placeholder="Username" 
                className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-10 py-3.5 outline-none focus:border-blue-500 transition-all"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
            <input 
              required
              type="email" 
              placeholder="Email" 
              className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-10 py-3.5 outline-none focus:border-blue-500 transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
            <input 
              required
              type="password" 
              placeholder="Password" 
              className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-10 py-3.5 outline-none focus:border-blue-500 transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Processing...' : isRegistering ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <button 
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full mt-6 text-sm text-gray-500 hover:text-white transition-colors"
        >
          {isRegistering ? 'Already have an account? Log in' : "New here? Create an account"}
        </button>
      </div>
    </div>
  );
};

export default Login;