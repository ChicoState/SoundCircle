interface CustomButtonProperties {
    title: string;
    disabled: boolean;
    click: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }
  
  function CustomButton({title, disabled, click}: CustomButtonProperties) {
    return(
      <button
      onClick={click}
      className="App-button"
      disabled={disabled}>
        {title}
      </button>
    );
  }

  export default CustomButton;