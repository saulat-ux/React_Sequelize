const PasswordInput = ({onChange}) => {
    const handleInputChange = (e) => {
        onChange(e.target.value);
    };
  return (
    <div>
        <label>
            <span>Password:</span>
        {/* <input type="password" ref={password} placeholder='password' onChange={handleInputChange} /> */}
        <input type="password"  placeholder='password' onChange={handleInputChange} />
        </label>
    </div>
  )
}

export default PasswordInput