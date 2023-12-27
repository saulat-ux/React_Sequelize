


const NameInput = ({onChange}) => {
    // const name = useRef('');

    // const handleInputChange = () => {
    //     inputRef.current = name.current.value;
    // };
    const handleInputChange = (e) => {
        onChange(e.target.value);
    };
  
  return (
    <div>

        <label>
            <span>Name:</span>
        {/* <input type="text"  placeholder='Name' ref={name} onChange={handleInputChange}/> */}
        <input type="text"  placeholder='Name'  onChange={handleInputChange}/>
        </label>
    </div>
  )
}


export default NameInput