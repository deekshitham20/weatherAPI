import React from "react";
import { useState,useEffect,useRef } from "react";
import axios from "axios";
function App() {
  const [location,setLocation] = useState('')
  const [data,setData] = useState({
    list:[
    ],
    city:{
      coord:{}
    }
  })
  const [lists,setLists]=useState({
    main:{

    },
    weather:[]
  })
  const [clicked,setClicked]=useState(false)
  const api = '99c58fde53fbe57140d9de6ea50b8927'
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${api}&units=metric`

  const search = async () => {
      await axios.get(url).then((res) => {
        console.log(res.data);
        setData(res.data);
        setLists(res.data.list[0])
        console.log(res.data.list[0])
      });
      setLocation(''); 
  };
  useEffect(()=> {
    console.log('hi')
    if(clicked){
    search()
    }
    console.log('bye')
  },[clicked])

const handleClick = (event) =>{
  if (event && event.preventDefault) { event.preventDefault(); }
  console.log('first')
  console.log(location)
  setClicked(!clicked)
  setLocation(location)
  //search()
}

const setIcon =(icon)=>{
    const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`
    return imageURL;
}
const setDay=(timestamp)=>{
      const dateobj = new Date(timestamp * 1000);
      const day = dateobj.toLocaleDateString('en-US', { weekday: 'long' });
      const mon = dateobj.toLocaleDateString('en-US', { month: 'long' });
      const date = dateobj.getDate()
      const year = dateobj.getFullYear()
      return day;
}

 return (
    <div className="app">
      <form onSubmit={handleClick}>
        <input type="text" name="loc" id="loc" placeholder="Search for city" value={location}
          onChange={event => setLocation(event.target.value)} autoFocus/>
      <button>SUBMIT</button>
      </form>

      <div className="section">
      <article className="article">
        <div className="container-in">
        <p className="head">Forecast</p>
        <hr className="hrn"/>
      <h3 className="name">{data.city.name}</h3>
      <h2>{
              lists.main ? <h1>{lists.main.temp}<sup>°</sup>C</h1> : null
            }</h2>
      <div>
      {data.list && data.list.map((d,i)=>(
        i % 8==0?
        <div>
                  <div className="container" key={i}>
                    <div className="day"> 
                      <p>{setDay(d.dt)}</p>
                    </div>
                    <div className="img"> 
                      <img className="image" src={setIcon(d.weather[0].icon)}/>
                    </div>
                    <div>
                      <p>{d.main.temp}<sup>°</sup></p>
                    </div>
                 </div>
                 <hr className="hrd"/>
        </div>
                 : null
              ))}
      </div>
      </div>
      </article>

        <article className="article">
        <div className="container-in">
          <p className="head">Details</p>
          <hr className="hrn"/>
          <div className="contain">
            <img className="cloud" src="cloud2.jpeg"/>
            <div class="sect">
            {<div>
              {lists.main ? <p className="details">Feels like<span class="span">{lists.main.feels_like}</span><sup>°</sup><hr/> </p>: null}
              {lists ? <p className="details">Visibility<span class="span">{lists.visibility}</span><hr/> </p> : null}
              {lists.main ? <p className="details">Humidity<span class="span">{lists.main.humidity}%</span><hr/> </p> : null}
              {lists.main ? <p className="details">Max temperature<span class="span">{lists.main.temp_max}<sup>°</sup></span><hr/> </p> : null}
              {lists.main ? <p className="details">Min temperature<span class="span">{lists.main.temp_min}<sup>°</sup></span><hr/> </p> : null}
              </div>
              }
            </div>
          </div>
          </div>
        </article>   
        </div>


          </div>
  );
 }

export default App;
