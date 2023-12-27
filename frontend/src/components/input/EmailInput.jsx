const EmailInput = ({ onChange }) => {

    const handleInputChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <label>
                <span>Email:</span>
                <input type="email" placeholder='email' onChange={handleInputChange} />
            </label>

        </div>
    )
}

export default EmailInput