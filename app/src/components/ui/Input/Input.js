import cn from 'classnames'
import { forwardRef } from 'react'
import s from './Input.module.css'

const Input = forwardRef(
  ({ className, type = 'text', name, onChange, onBlur, ...rest }, ref) => (
    <div className={cn(s.root, className)}>
      <input
        type={type}
        className={s.field}
        autoComplete="off"
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        name={name}
        {...rest}
      />
    </div>
  )
)

export default Input
