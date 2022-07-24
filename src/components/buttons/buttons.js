import './buttons.scss'

// we have three diferent kind of buttons(default, inverted, google sign in) so we need a special way to achieve that with just one component

const buttons_types = {
    googleBtn: 'google-sign-in',
    invertedBtn: 'inverted'
}

const Buttons = ({value, category, ...otherProps}) => {
  return (
    <button className={`${buttons_types[category]} button-container`} {...otherProps}>{value}</button>
  )
}

export default Buttons