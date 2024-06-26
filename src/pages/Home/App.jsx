import React, { useState } from 'react';
import Header from '../../components/Header/header.jsx';
import ItemList from '../../components/ItemList/ItemList.jsx';
import BACKGROUND from '../../assets/images/image.png';
import './styles.css';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleGetData = async () => {
    try {
      const userData = await fetch(`https://api.github.com/users/${user}`);
      const newUser = await userData.json();

      if (newUser.name) {
        const { avatar_url, name, bio, login } = newUser;
        setCurrentUser({ avatar_url, name, bio, login });

        const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
        const newRepos = await reposData.json();

        if (newRepos.length) {
          setRepos(newRepos);
        } else {
          setRepos([]);
        }
      } else {
        setCurrentUser(null);
        setRepos([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setCurrentUser(null);
      setRepos([]);
    }
  };

  return (
    <div className='app'>
      <Header />
      <main className='conteudo'>
        <img src={BACKGROUND} alt="background" className='background' />
        <div className='info'>
          <div>
            <input
              type="text"
              name='usuario'
              placeholder='@username'
              className='conteudo__input'
              value={user}
              onChange={event => setUser(event.target.value)}
            />
            <button
              className='conteudo__button'
              onClick={handleGetData}
            >
              Buscar
            </button>
          </div>

          {currentUser ? (
            <>
              <div className='perfil'>
                <img
                  src={currentUser.avatar_url}
                  alt="Profile"
                  className='profile'
                />
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}

          {repos.length ? (
            <div>
              <h4 className='repositorio'>Repositórios</h4>
              {repos.map((repo) => (
                <ItemList key={repo.id} title={repo.name} description={repo.description} />
              ))}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
