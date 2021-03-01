import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';

import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeContextData {
  level: number;
  currentExperience: number;
  challengeCompleted: number; 
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallange: () =>void;
  completeChallange: () =>void;
  closeLevelUpModal: () => void;
}

interface ChallengeProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ 
  children, 
  ...rest
}: ChallengeProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperince] = useState(rest.currentExperience ?? 0);
  const [challengeCompleted, setchallengeCompleted] = useState(rest.challengeCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengeCompleted', String(challengeCompleted));
  }, [level, currentExperience, challengeCompleted])
  
  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor( Math.random() * challenges.length )
    const challenge = challenges[randomChallengeIndex];
    
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 💪', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallange() {
    setActiveChallenge(null);
  }

  function completeChallange() {
    if (!activeChallenge) {
      return;
    }

    const {amount} = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperince(finalExperience);
    setActiveChallenge(null)
    setchallengeCompleted(challengeCompleted + 1)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  return (
    <ChallengeContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        challengeCompleted, 
        levelUp,
        experienceToNextLevel,
        startNewChallenge,
        activeChallenge,
        resetChallange,
        completeChallange,
        closeLevelUpModal
      }}
    >
      { children }

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  )
}