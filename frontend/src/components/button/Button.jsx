import './button.modules.css'

const Button = ({children}) => {
  return (
    <div>
        <button>{children} </button>
    </div>
  )
}

export default Button