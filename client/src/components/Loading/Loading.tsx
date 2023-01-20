import styles from './Loading.module.css';
import { animate } from 'motion';

interface LoadingProps {
  complete?: boolean;
  timeout?: number;
}

const LoadingBar = ({ complete = false, timeout = 50 }: LoadingProps) => {
  const progressBar = document.querySelector(`.${styles.loadingBarInner}`);
  if (progressBar && !complete) {
    animate(progressBar, { width: '100%' }, { duration: timeout });
  } else if (progressBar && complete) {
    animate(progressBar, { width: '100%' }, { duration: 0.1 });
  }
  return (
    <div className="flex flex-row items-center gap-5">
      <div className={styles.loadingBar}>
        <div className={styles.loadingBarInner} data-loading={!complete}></div>
      </div>
    </div>
  );
};

const Placeholder = () => {
  return <div className="h-3 w-full animate-pulse rounded-full bg-base-3"></div>;
};

export { LoadingBar, Placeholder };
