import axios from 'axios';
//import { environment } from './Environment';
//debugging 

const ErsClient = axios.create({ 
baseURL: "1810-nchristian-projectone.rwegmths2p.us-west-2.elasticbeanstalk.com/",
headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export default ErsClient;