import database from './database.js'

const getAllTeam = () => {
    //Get All Favorite Team From Database
    database.getTeam()
        .then(data => {
            let teamsHTML = ''
            data.forEach(team => {
                teamsHTML  +=
                `
                <div class="col s12 m7">
                    <div class="card horizontal">
                    <div class="card-image justify-content-center">
                        <img src="${team.logo}" width="50%">
                    </div>
                    <div class="card-stacked">
                        <div class="card-content">
                        <h4 class="header"><b>${team.name}</b></h4>
                        <span><p class="p-bold">Stadium:</p> ${team.venue}</span>
                        <span><p class="p-bold">Address:</p> ${team.address}</span>
                        </div>
                        <div class="card-action">
                        <a onclick="deleteFavoriteTeam(${team.id},'${team.name}')" class="btn-floating btn-large waves-effect waves-light red darken-2 right">
                        <i class="material-icons">delete_forever</i></a>
                        </div>
                    </div>
                    </div>
                </div>
                `
            })
            //insert All Team in Database to DOM
            document.getElementById('progress').style.display = 'none'
            document.getElementById('favoriteTeams').innerHTML = teamsHTML
        })
}

const pushNotification = msg => {
    const title = 'Notifikasi';
    const options = {
        body: msg,
        icon: '/icon.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(regis => {
            regis.showNotification(title, options);
        });
    }
}

const addFavoriteTeam = (id,logo,name,venue,address,website) => {
    //Add To Database
    database.addTeam({id,logo,name,venue,address,website})
    //Display Toast
    M.toast({html: `${name} Saved to Favorite!`});
    //Push Notification
    pushNotification(`${name} Saved to Favorite!`)
}

const deleteFavoriteTeam = (id,name) => {
    //Conform Delete Favorite ?
    let imSure = confirm(`${name} this Remove ?`)
    if(imSure){
        //Delete Team From Database
        database.deleteTeam(id)
        //Fetch All Team
        getAllTeam()
        //Display Toast
        M.toast({html: `${name} Removed!!`})
        //Push Notification
        pushNotification(`${name} Removed11`)
    }
    
}

export default {
    addFavoriteTeam,
    getAllTeam,
    deleteFavoriteTeam
}