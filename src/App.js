import React from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

function App() {
    return (
        <div className="App">
            <h1>Post App</h1>
            <PostForm />
            <PostList />
        </div>
    );
}

export default App;
