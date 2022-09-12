interface ButtonProps{
  title?: string
}

function Button(props: ButtonProps){
  return(
    <button> { props.title } </button>
  )
}

function App() {
  return(
    <div>
      <Button title="oi1" />
      <Button title="oi2" />
      <Button />
      <Button />
    </div>
  )
}

export default App
