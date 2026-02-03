import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from '../components/editor/CodeEditor';
import TodoBoard from '../components/todos/TodoBoard';
import { LayoutGrid, Code2, Users } from 'lucide-react';

const Workspace = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div className="flex h-screen overflow-hidden bg-dark-900">
      {/* Sidebar Navigation */}
      <div className="w-16 border-r border-dark-700 flex flex-col items-center py-6 gap-8 bg-dark-800/30">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold">CH</div>
        <button onClick={() => setActiveTab('editor')} className={`p-2 rounded-lg ${activeTab === 'editor' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-500'}`}><Code2 /></button>
        <button onClick={() => setActiveTab('todos')} className={`p-2 rounded-lg ${activeTab === 'todos' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-500'}`}><LayoutGrid /></button>
        <button className="text-gray-500 mt-auto mb-4"><Users /></button>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">
        <header className="h-14 border-b border-dark-700 flex items-center px-6 justify-between bg-dark-800/20">
          <h1 className="font-medium text-gray-300 italic">workspace / <span className="text-white not-italic font-bold">{id}</span></h1>
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-dark-900 bg-gradient-to-tr from-blue-500 to-purple-500" />
            ))}
          </div>
        </header>

        <div className="flex-grow flex">
          <div className={`${activeTab === 'editor' ? 'w-full' : 'w-1/2'} transition-all duration-300 border-r border-dark-700`}>
            <CodeEditor roomId={id} />
          </div>
          {activeTab === 'todos' || activeTab === 'split' ? (
             <div className="w-1/2 p-6 overflow-y-auto">
                <TodoBoard workspaceId={id} />
             </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default Workspace;