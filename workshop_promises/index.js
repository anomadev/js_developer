function GET(url) {
  return new Promise(function(resolve, reject) {
    let ajaxCall =  new XMLHttpRequest();
    ajaxCall.open('GET', url);
    
    ajaxCall.onload = function() {
      if(ajaxCall.status == 200) return resolve(ajaxCall.response);
      reject(Error(ajaxCall.status));
    };

    ajaxCall.onerror = function(err) {
      reject(err);
    }

    ajaxCall.send();
  });  
}

function getUser(username) {
  return GET("https://api.github.com/users/" + username);
}

function getRepos(repos_url) {
  return GET(repos_url);
}

function getGitHubUserInfo() {
  let getUserPromise = getUser();
  let getReposPromise = getUser().then(response => {
    return getRepos(JSON.parse(response).repos_url);
  });
  return Promise.all([getUserPromise, getReposPromise])
}

getGitHubUserInfo().then(([userInfo, reposInfo]) => {
  console.log("Información del usuario:");
  console.log(userInfo);
  console.log("Información de los repositorio:");
  console.log(reposInfo);
}).catch(err => console.log(err));
