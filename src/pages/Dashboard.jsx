import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Plus, Layout, Code, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) return;
    // Show workspaces where user is owner or collaborator
    const q = query(collection(db, "workspaces"), where("collaborators", "array-contains", auth.currentUser.uid));
    return onSnapshot(q, (snapshot) => {
      setWorkspaces(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const createWorkspace = async () => {
    const name = prompt("Workspace Name?");
    if (!name) return;
    await addDoc(collection(db, "workspaces"), {
      name,
      ownerId: auth.currentUser.uid,
      collaborators: [auth.currentUser.uid],
      createdAt: new Date()
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black">YOUR <span className="text-blue-500">WORKSPACES</span></h1>
        <button onClick={createWorkspace} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105">
          <Plus size={20} /> New Workspace
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspaces.map(ws => (
          <div 
            key={ws.id}
            onClick={() => navigate(`/workspace/${ws.id}`)}
            className="group bg-[#121212] border border-white/5 p-6 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-600/10 rounded-lg text-blue-500"><Layout /></div>
              <ArrowRight className="text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold mb-1">{ws.name}</h3>
            <p className="text-sm text-gray-500">Shared with {ws.collaborators?.length} members</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;