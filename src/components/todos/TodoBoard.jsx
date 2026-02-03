import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const TodoBoard = ({ workspaceId }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const q = query(collection(db, `workspaces/${workspaceId}/tasks`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [workspaceId]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask) return;
    await addDoc(collection(db, `workspaces/${workspaceId}/tasks`), {
      title: newTask,
      status: 'not-started',
      priority: 'medium',
      createdAt: new Date()
    });
    setNewTask("");
  };

  const toggleStatus = async (taskId, currentStatus) => {
    const nextStatus = currentStatus === 'finished' ? 'not-started' : 'finished';
    await updateDoc(doc(db, `workspaces/${workspaceId}/tasks`, taskId), {
      status: nextStatus
    });
  };

  return (
    <div className="p-6 bg-dark-800/50 border border-dark-700 rounded-xl backdrop-blur-md">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <CheckCircle2 className="text-blue-400" /> Team Tasks
      </h2>
      
      <form onSubmit={addTask} className="mb-6 flex gap-2">
        <input 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a collaborative task..."
          className="flex-grow bg-dark-900 border border-dark-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <button type="submit" className="bg-blue-600 p-2 rounded-lg hover:bg-blue-500 transition-all">
          <Plus />
        </button>
      </form>

      <div className="space-y-3">
        {tasks.map(task => (
          <div 
            key={task.id}
            onClick={() => toggleStatus(task.id, task.status)}
            className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
              task.status === 'finished' ? 'bg-dark-900/50 border-green-900/50 opacity-50' : 'bg-dark-900 border-dark-700 hover:border-blue-500/50'
            }`}
          >
            <span className={task.status === 'finished' ? 'line-through' : ''}>{task.title}</span>
            {task.status === 'finished' ? <CheckCircle2 className="text-green-500" size={18} /> : <Clock className="text-yellow-500" size={18} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoBoard;