import './slider.css'
import plant from './images/isolated-plant-pot_92267-310-fotor-bg-remover-2023072811217.png'
import React, { useState, useEffect } from 'react';

const Slider = () => {
    const [feedItems, setFeedItems] = useState([]);

    const getFeedItems = async () => {
      try {
        const response = await fetch('http://localhost:4000/feed');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFeedItems(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
  
    useEffect(() => {
      getFeedItems();
    }, []);
    const getRandomItems = (array, count) => {
        const shuffledArray = array.sort(() => Math.random() - 0.5);
        return shuffledArray.slice(0, count);
      };
    
      // Display 4 random feed items
      const randomFeedItems = getRandomItems(feedItems, 4);
  return (
    <div className="slider">
      <div className="slides">
        <input type="radio" name="radio-btn" id="radio1" />
        <input type="radio" name="radio-btn" id="radio2" />
        <input type="radio" name="radio-btn" id="radio3" />
        <input type="radio" name="radio-btn" id="radio4" />
        {randomFeedItems.map((feedItem, index) => (
          <div
            className={`slide ${index === 0 ? 'slide first' : ''}`}
            key={index}
          >
            <div className="container">
              <div className="content-container">
                <h2 className="title">
                  {feedItem.title}
                </h2>
                <p className="content">
                  {feedItem.description}
                </p>
              </div>
              <div className="image-container">
                <img src={feedItem.imageUrl} alt={feedItem.title} />
              </div>
            </div>
          </div>
        ))}
        <div className="navigation-auto">
          <div className="auto-btn1"></div>
          <div className="auto-btn2"></div>
          <div className="auto-btn3"></div>
          <div className="auto-btn4"></div>
        </div>
      </div>

      <div className="navigation-manual">
        <label htmlFor="radio1" className="manual-btn"></label>
        <label htmlFor="radio2" className="manual-btn"></label>
        <label htmlFor="radio3" className="manual-btn"></label>
        <label htmlFor="radio4" className="manual-btn"></label>
      </div>
    </div>
  )
}
export default Slider
