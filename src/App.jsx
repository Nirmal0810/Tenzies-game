import { useState, useEffect } from 'react'
import './App.css'
import Die from './Components/Die'
import Confetti from 'react-confetti'
import {nanoid} from 'nanoid'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const isHeldVal = dice.every(die => die.isHeld)
    const sameValue = dice.every(die => die.value===dice[0].value)
    if(isHeldVal && sameValue){
      setTenzies(true)
    }
  }, [dice])


  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDice(){
    const newDice = []
    for(let i=0; i<10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice(){
    if(!tenzies){

      setDice(oldDice => (oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      })))

    }
    else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function dieIsHeld(id){
    setDice(oldDice => (
      oldDice.map(die => {
        return die.id===id ? {...die, isHeld:!die.isHeld} : die
      })))
  }

  const dieElements = dice.map(die => (
        <Die 
            value={die.value} 
            key={die.id} 
            isHeld={die.isHeld}
            dieIsHeld={() => dieIsHeld(die.id)}
          />
        ))

  return (
    <main className='main-container'>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same.<br/> Click each die to freeze it at its current value between rolls</p>
      <div className='dice-container'>
        {dieElements}
      </div> 
      <button className='Roll-btn' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
   
    </main>
  )
}

export default App
