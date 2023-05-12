import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CgClose } from 'react-icons/cg';

type TCard = {
    id: string;
    title: string;
};

function App() {
    const [title, setTitle] = useState('');
    const [cards, setCards] = useState<TCard[]>([]);

    const addCard = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3000/api/v1/cards', {
            title: title,
        });
        setTitle('');
        setCards([...cards, response.data.card[0]]);
        return response.data;
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
                              <article className='card' key={card.id}>
                                  {card.title}
                                  <button className='delete-btn' onClick={() => removeCard(card.id)}>
                                      <CgClose />
                                  </button>
                              </article>
                          );
                      })
                    : null}
            </div>
            <form>
                <label htmlFor='card-title'>Card Title</label>
                <input id='card-title' type='text' value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)} />
                <button type='submit' onClick={addCard}>
                    Add Card
                </button>
            </form>
        </div>
    );
}

export default App;
