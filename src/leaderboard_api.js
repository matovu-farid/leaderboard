import { storage } from './local_storage';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const createGame = async () => {
  const game = {
    name: 'Mortal Kombat',
  };

  const response = await fetch(`${url}games/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(game),
  });
  const gameId = await response.json();

  const str = gameId.result.match(/(?<=:\s)\w+/g)[0];
  storage.save({ gameID: str });

  return str;
};
if (storage.retrieve() === null) {
  createGame();
}

const scoreDisplay = () => document.querySelector('#score-display');
const checkEmpty = () => {
  if (scoreDisplay().innerHTML === '') {
    const listItem = document.createElement('li');
    listItem.textContent = 'No scores recorded';
    scoreDisplay().appendChild(listItem);
  }
};
const displayScores = (scores) => {
  scores.forEach((scoreObject) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${scoreObject.user}: ${scoreObject.score}`;
    scoreDisplay().appendChild(listItem);
  });
};

const scoresUrl = () => `${url}games/${storage.retrieve()}/scores/`;
const getScoreObjects = async () => {
  const response = await fetch(scoresUrl());
  const scores = (await response.json()).result;

  displayScores(scores);
};

const refresh = async () => {
  scoreDisplay().innerHTML = '';
  await getScoreObjects();
  checkEmpty();
};

const addRefresh = () => {
  const button = document.querySelector('#refresh');
  button.addEventListener('click', () => {
    refresh();
  });
};
window.addEventListener('load', () => {
  refresh();
});
addRefresh();

const postScore = (scoreObject) => {
  fetch(scoresUrl(), {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(scoreObject),

  });
};
const addSubmit = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const object = {
      user: formData.get('user'),
      score: formData.get('score'),
    };
    form.reset()

    postScore(object);
  });
};

addSubmit();
