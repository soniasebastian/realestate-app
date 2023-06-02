
let queryURL = "https://api.bridgedataoutput.com/api/v2/test/openhouses?access_token=6baca547742c6f96a6ff71b138424f21";
       fetch(queryURL)
       .then(res => res.json())
        .then(data => console.log(data))


        let queryURL2 = "https://api.bridgedataoutput.com/api/v2/test/listings/5dba1ff74aa4055b9f2a4fdc?access_token=6baca547742c6f96a6ff71b138424f21";
        fetch(queryURL2)
        .then(res => res.json())
         .then(data => console.log(data))
    
         let queryURL3 = "https://api.bridgedataoutput.com/api/v2/OData/test/Property('P_5dba1ff74aa4055b9f2a4fdb')?access_token=6baca547742c6f96a6ff71b138424f21";
         fetch(queryURL3)
         .then(res => res.json())
          .then(data => console.log(data))
     