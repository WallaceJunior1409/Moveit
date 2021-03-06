import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/Components/CompletedChallenges.module.css';

export function CompletedChallenges() {
  const { challengeCompleted } = useContext(ChallengeContext);

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>{ challengeCompleted }</span>
    </div>
  );
}