import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CgClose } from 'react-icons/cg';

type TCard = {
    id: string;
    title: string;
    answer: string;
};

function App() {
    const [title, setTitle] = useState('');
    const [answer, setAnswer] = useState('');
    const [cards, setCards] = useState<TCard[]>([]);

    const addCard = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title && answer) {
            const response = await axios.post('http://localhost:3000/api/v1/cards', {
                title: title,
                answer: answer,
            });
            setTitle('');
            setAnswer('');
            setCards([...cards, response.data.card[0]]);
            return response.data;
        } else {
            return;
        }
    };

    const removeCard = async (deckId: String) => {
        const response = await axios.delete(`http://localhost:3000/api/v1/cards/${deckId}`);
        setCards(cards.filter((item) => item.id !== deckId));
        return response.data;
    };

    useEffect(() => {
        const getCards = async () => {
            const response = await axios.get('http://localhost:3000/api/v1/cards');
            setCards(response.data.cards);
        };
        getCards();
    }, []);

    return (
        <div className='flash-cards'>
            <div className='flash-cards-container'>
                {cards.length > 0
                    ? cards.map((card) => {
                          return (
                              <article
                                  className='card'
                                  key={card.id}
                                  onClick={(e) => {
                                      e.currentTarget.classList.toggle('card-active');
                                  }}
                              >
                                  <div className='card-side card-front'>
                                      <p className='question'>{card.title}</p>
                                      <button className='delete-btn' onClick={() => removeCard(card.id)}>
                                          <CgClose />
                                      </button>
                                  </div>
                                  <div className='card-side card-back'>
                                      <p className='answer'>{card.answer}</p>
                                      <button className='delete-btn' onClick={() => removeCard(card.id)}>
                                          <CgClose />
                                      </button>
                                  </div>
                              </article>
                          );
                      })
                    : null}
            </div>
            <form>
                <div className='form-container'>
                    <div>
                        <div className='form-row'>
                            <label htmlFor='card-title'>Card Question:</label>
                            <input id='card-title' type='text' value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)} />
                        </div>
                        <div className='form-row'>
                            <label htmlFor='card-answer'>Card Answer:</label>
                            <input id='card-answer' type='text' value={answer} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.currentTarget.value)} />
                        </div>
                    </div>
                    <button type='submit' onClick={addCard}>
                        Add Card
                    </button>
                </div>
            </form>
        </div>
    );
}

export default App;
