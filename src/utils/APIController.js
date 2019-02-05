/**
 * 
 * @param {String} url - url 
 * @param {Obj} params - {key: value} objects containing parameters 
 */
exports.getMethod = (url, params) => {
  let finalUrl = url;
  // console.log(finalUrl);
  Object.keys(params).forEach(function(key,index) {
    // console.log(key, ' : ', index);
    if(index === 0)
      finalUrl = finalUrl + '?';
    else {
      finalUrl = finalUrl + '&';
    }
    finalUrl = finalUrl + key + '=' + params[key];
  });
  // console.log('finalurl');
  console.log(finalUrl);
  return new Promise((resolve, reject) => {
    fetch(finalUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      console.log(response.status);
      response.text().then((res) => {
        console.log(res);
        console.log(typeof res);
        res = JSON.parse(res);
        console.log(res);
        // if (res.status === 'failed'){ //(response.status < 200 || response.status >= 300){
        //   console.log(res)
        //   reject(res)
        // }
        resolve(res)
      })
    }).catch((err) => reject(err))
  });
};


// export const postMethod = (url, payload) => {
//   return new Promise((resolve, reject) => {
//     fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: payload
//     }).then((response) => {
//       console.log(response);
//       resolve(response);
//     }).catch((err) => reject(err))
//   })
// }
