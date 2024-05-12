import { TIMEOUT_SECONDS } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
  

export const getJSON = async function(url){
    try{
        const fetchPromise = fetch(url);
        const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SECONDS)]);
        const dataJson = await res.json();
        
        if(!res.ok ){      
            throw new Error(`${dataJson.message} (${res.status})`);
        }

        return dataJson;
    }
    catch(err){
        console.log("aaa");
        throw err;
    }
}

export const sendJSON = async function(url, uploadData){
  try{
      const fetchPromise = fetch(url, {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(uploadData)
      });
      const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SECONDS)]);
      const dataJson = await res.json();
      
      if(!res.ok ){      
          console.log("anan");
          throw new Error(`${dataJson.message} (${res.status})`);
      }

      return dataJson;
  }
  catch(err){
      throw err;
  }
}