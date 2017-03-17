function getAccessToken(api) {
  api.getToken(function(token){
    if(token.expires_in < new Date()) {
      api.getAccessToken(function(err, token) {
        api.AccessToken = token;
      })
    }else {
      api.AccessToken = token;
    }
  })
  return api;
}


module.exports  = getAcccessToken;