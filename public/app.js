class App extends React.Component {
state = {
  band: '',
  size: '',
  color: '',
  image: '',
  shirts: []
}
change=(event)=>{
  this.setState({
    [event.target.id]: event.target.value
  })
}
submit=(event)=>{
  event.preventDefault()
  axios.post('/shirts', this.state).then((response)=>
  this.setState({
    shirts: response.data,
    band: '',
    size: '',
    color: '',
    image: ''
    })
  )
}
delete=(event)=>{
  axios.delete('/shirts/' + event.target.value).then((response)=>{
    this.setState({
      shirts: response.data
    })
  })
}
update=(event)=>{
  event.preventDefault()
  const id = event.target.id
  axios.put('/shirts/' + id, this.state).then(response=>{
    this.setState({
      shirts: response.data,
      band: '',
      size: '',
      color: '',
      image: ''
    })
  })
}
componentDidMount=()=>{
  axios.get('/shirts').then((response)=>{
    this.setState({
      shirts: response.data
    })
  })
}
showStats=(event)=>{
  event.preventDefault()
  let stats = this.state.showStats
  axios.get('/shirts/' + event.target.id).then((response)=>{

      if(stats){
        this.setState({
          showStats:false,
          shirts: response.data
        })
      }else{
        this.setState({
          showStats:true,
          shirts: response.data
        })
    }
  })
}

render=()=>{
  return (
<div className='main'>
  <h1>T-Shirt Swap</h1>
  <h3><i>A place to swap t-shirts for our aging punk rock community that continues to gain weight.</i></h3>
  <br />
  <h2>Create New Post:</h2>
<form onSubmit={this.submit}>
  <label htmlFor='band'>Band:</label>
<input type='text' id='band' value={this.state.band} onChange={this.change} />
  <br />
  <label htmlFor='size'>Size:</label>
<input type='text' id='size' value={this.state.size} onChange={this.change} />
  <br />
  <label htmlFor='color'>Color:</label>
<input type='text' id='color' value={this.state.color} onChange={this.change} />
  <br />
  <label htmlFor='image'>Image:</label>
<input type='text' id='image' value={this.state.image} onChange={this.change} />
  <br />
<input type='submit' value='Create New Post' />
  <br />
</form>
  <br />


  <br />
  <button value={this.state._id} onClick={this.showStats}>
  Show Details</button>
  <br />
  <div className='mainCage'>
  {this.state.shirts.map((shirts, i)=>{
    return (
      <div className='cage' key={i}>
      <h4>Band: {shirts.band} </h4>
      <h4>{ this.state.showStats ? 'Size: ' + shirts.size : null }</h4>
      <h4>{ this.state.showStats ? 'Color: ' + shirts.color : null }</h4>
      <img src={shirts.image} alt={shirts.name} />
      <br />
      <details>
        <summary>Edit this Post:</summary>
        <form id={shirts._id} onSubmit={this.update}>
          <label htmlFor='band'>Band:</label>
            <input type='text' id='band' value={shirts.band} onChange={this.change} />
            <br />
            <label htmlFor='size'>Size:</label>
            <input type='text' id='size' onChange={this.change} />
            <br />
            <label htmlFor='color'>Color:</label>
            <input type='text' id='color' onChange={this.change} />
            <br />
            <label htmlFor='name'>Image:</label>
            <input type='text' id='image' onChange={this.change} />
            <br />
            <input type='submit' value='Update Post' />
        </form>
      </details>
      <button value={shirts._id} onClick={this.delete}>Delete Post</button>
      <br />
      </div>
    )
  })}
    </div>
</div>
    )
  }
}


ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
