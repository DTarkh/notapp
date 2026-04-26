import MDEditor from '@uiw/react-md-editor'
import styles from './MarkdownView.module.css'

interface MarkdownViewProps {
  source: string
  className?: string
}

export const MarkdownView = ({ source, className }: MarkdownViewProps) => {
  const composedClassName = className
    ? `${styles.markdownView} ${className}`
    : styles.markdownView

  return <MDEditor.Markdown source={source} className={composedClassName} />
}
