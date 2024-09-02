import React from "react";

class Container extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Count: 0,
        }
        console.log("Constructor")
    }

componentDidMount(){
    console.log("Component Did Mount")
    this.setState({Count: 4})
}

componentDidUpdate(){
    console.log("Component Did Update")
    if(this.state.Count === 10){
        this.setState({ Count : 5 })
    }
}

    render(){
        return(
            <div className="flex items-center my-5">
                <h1 className="text-xl mr-3">{this.state.Count}</h1>
                <button className="bg-black p-3 text-white" onClick={() => this.setState ({Count: this.state.Count + 1})}>+</button>
                {console.log("Render")}
            </div>
        )
    }
}

export default Container