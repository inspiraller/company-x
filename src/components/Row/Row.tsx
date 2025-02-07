import { PropsWithChildren } from "react";
import styles from '@/styles/row.module.css';

export const Row = ({children}: PropsWithChildren) => <div className={styles.row}>{children}</div>