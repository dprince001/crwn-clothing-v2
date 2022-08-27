import './buttons.scss'

// we have three diferent kind of buttons(default, inverted, google sign in) so we need a special way to achieve that with just one component

const buttons_types = {
    googleBtn: 'google-sign-in',
    invertedBtn: 'inverted'
}

const Buttons = ({value, btnType, ...otherProps}) => {
  return (
    <button className={`button-container ${buttons_types[btnType]}`} {...otherProps}>{value}</button>
  )
}

export default Buttons