import React, { useState } from 'react'

function Faqpage() {
    const [question,setQuestion]=useState("");
    const [answer,setAnswer]=useState("");
    const [loading,setLoading]=useState();
    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            const data = await response.json();
            setLoading(false);
            setAnswer(data.answer);
        } catch (error) {
            console.error('Error:', error);
        }
    };
  return (
    <div>
        <div>
            <input type='text' name='question' value={question} onChange={handleQuestionChange}></input>
        </div>
        <div>
            <button onClick={handleSubmit}>send</button>
        </div>
        <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>{answer}</p>
        </div>
      )}
    </div>
    </div>
  )
}

export default Faqpage;
