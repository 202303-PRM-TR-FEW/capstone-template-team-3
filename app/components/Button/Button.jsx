const Button = ({ name, type, clickAction, style }) => {
    return (
        <button type={type} onClick={clickAction} className={style}>{name}</button>
    )
}

export default Button