import React from 'react'
import { Sparkles } from 'lucide-react';
import Letter from '../assets/letters.png';
const Title = () => {
  return (
    <div>      <div className="hero" style={{
        backgroundImage: `url(${Letter} )`,
            }}
            >
            <h1>
              En Yüksek Skoru Yap
            </h1>
            <Sparkles 
            size={120}
            />
            <h2>Lider Ol!</h2>
                  </div></div>
  )
}

export default Title