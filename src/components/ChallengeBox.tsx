import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/Components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, resetChallange, completeChallange } = useContext(ChallengeContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSucceded() {
    completeChallange();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallange();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe { activeChallenge.amount } xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio.</strong>
            <p>{ activeChallenge.description }</p>
          </main>

          <footer>
            <button 
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button 
              type="button"
              className={styles.challengeSuccededButton}
              onClick={handleChallengeSucceded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um cliclo para receber desafios.</strong>
          <p>
            <img src="icons/level-up.svg" alt="Lever Up"/>
            Avance de level completando desafios.
          </p>
        </div>
      ) }
    </div>
  )
}