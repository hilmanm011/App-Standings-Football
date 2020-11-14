import database from './database.js'

const getAllTeam = () => {
    //Get All Favorite Team From Database
    database.getTeam()
        .then(data => {
            let teamsHTML = ''
            data.forEach(team => {
                teamsHTML  +=
                `
                <div class="col s12">
                    <div class="card">
                    <div class="card-content row valign-wrapper">
                        <div class="col s6" class="logo-team">
                            <img src="${team.logo}" alt="${team.name}" class="responsive-img center-align" width="50%" >
                        </div>
                        <div class="col s8 information-team">
                        <span class="badge-blue"><strong>${team.name}</strong></span>
                        <span><p class="p-bold">Stadium:</p> ${team.venue}</span>
                        <span><p class="p-bold">Address:</p> ${team.address}</span>
                        <a href="${team.website}" target="blank">${team.website}</a>
                        </div>
                    </div>
                    <div class="card-action right-align">
                        <button onclick="deleteFavoriteTeam(${team.id},'${team.name}')" class="waves-effect waves-light btn red darken-2">Remove</button>
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