import React, { Component } from 'react'
import axios from 'axios'
import  Pubsub from 'pubsub-js'
import './css/index.css'
export default class  Test  extends Component {
  state = {  
    Lister: [],  
    keyWord: '',
    isFirst:true,
    isLoading:false,
    err:''  
  }; 
   search=()=>{
    const keywodes =this.keyWord.value
    Pubsub.publish('addList','我是发布者')
    
      this.setState({ isFirst:false,isLoading:true }); 
      axios.get(`https://api.github.com/search/users?q=${keywodes}`).then(
        res=>{
          console.log(res.data.items)
           this.setState({ Lister: res.data.items,isLoading:false }); 
        },
        err=>{
          this.setState({isLoading:false,err:err.message})
       
        }
      ).catch(err=>{
        alert(err)
      })
   }

  render() {
    const {Lister,
      isFirst,
      isLoading,
      err  } =this.state
    return (
   
      <div>
        <div className='my-custom-style'>
        <div className='lyd'>
        <span className='titles'>搜索用户:</span>
            <input type="text" ref={c=>this.keyWord=c} className='ipt' />  <button className='btn'  onClick={this.search}>  搜索</button>

        </div>

      </div>
      <div className='boxes'>
     
          {  isFirst? <h2>请输入github用户名</h2> : isLoading? <h2>loading.....</h2> :err? <h2 style={{color:'red'}}>{err}</h2>:    Lister.map(item=>
            (<div key={item.avatar_url}className='fld'> <div>
              <a href={item.html_url} target='_blank'><img src={item.avatar_url} alt=""  /></a>
                
                <p className='txt'>  {item.login} </p>
                </div></div>
         
            )
          )}
        </div>
      </div>
      
    )
  }
}
