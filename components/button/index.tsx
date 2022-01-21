import { FC, useMemo } from 'react'
import { Button, ButtonProps } from 'antd'
import classNames from 'classnames'
// style
import 'antd/lib/button/style'
import './index.scss'

interface DoveButtonProps {
  dType?: 'green'
}

const DoveButton: FC<ButtonProps & DoveButtonProps> = ({
  dType = 'green',
  type = 'primary',
  ...props
}) => {
  const cname = useMemo(() => {
    return classNames('dove-btn', `dove-btn-${dType}`)
  }, [dType])

  return (
    <Button className={cname} type={type} {...props} />
  )
}

export default DoveButton