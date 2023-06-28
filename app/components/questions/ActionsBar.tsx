import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './ActionsBar.module.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

export const ActionsBar = ({ onAdd }: { onAdd: () => void }) => {
  const [top, setTop] = useState(0)
  const updateTop = () => {
    setTop(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', updateTop)

    return () => window.removeEventListener('scroll', updateTop)
  }, [])

  return (
    <ul className={styles.actionsBar} style={{ top }}>
      <li className={styles.actionsBarItem}>
        <button onClick={() => onAdd()} className={styles.actionsBarButton}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </li>
    </ul>
  )
}

export const ActionsBarContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <div className={styles.actionsBarContainer}>{children}</div>
}
