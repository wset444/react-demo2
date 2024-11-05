import React, { Component } from 'react'
import  Pubsub from 'pubsub-js'

export default class index extends Component {
  componentDidMount(){
    Pubsub.subscribe('addList',(_,data)=>{
      alert(data)
    })
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
