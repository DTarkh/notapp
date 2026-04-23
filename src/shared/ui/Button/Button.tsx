import { Button as RACButton } from 'react-aria-components/Button'
import type { ButtonProps as RACButtonProps } from 'react-aria-components/Button'
import { composeRenderProps } from 'react-aria-components/composeRenderProps'
import { ProgressCircle } from '../ProgressCircle/ProgressCircle'
import clsx from 'clsx'
import './Button.css'

interface ButtonProps extends RACButtonProps {
  /**
   * The visual style of the button (Vanilla CSS implementation specific).
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'accent'
}

export const Button = (props: ButtonProps) => {
  const { variant = 'primary', className, ...rest } = props
  const combinedClassName = clsx([
    'react-aria-Button',
    'button-base',
    className,
  ])

  return (
    <RACButton {...rest} className={combinedClassName} data-variant={variant}>
      {composeRenderProps(rest.children, (children, { isPending }) => (
        <>
          {!isPending && children}
          {isPending && (
            <ProgressCircle aria-label="Saving..." isIndeterminate />
          )}
        </>
      ))}
    </RACButton>
  )
}
