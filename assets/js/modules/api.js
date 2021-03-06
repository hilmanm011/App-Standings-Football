const base_url = 'https://api.football-data.org'
const api_token = 'acbd16a8645a4e53ac980535e89f918c'

let status = res => {
    if(res.status != 200){
        console.log(`Error : ${res.status}`)
        return Promise.reject(new Error(res.statusText()))
    }else{
        return Promise.resolve(res)
    }
}

const getStandings = leagueID => {
    if('caches' in window){
        caches.match(`${base_url}/v2/competitions/${leagueID}/standings`)
        .then(res => {
            if(res){
                res.json()
                .then(data => {
                    let standingsHTML = ''
                    data = data.standings[0].table

                    data.forEach(dataTeam => {
                        let urlTeamImage = dataTeam.team.crestUrl
                        urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
                        standingsHTML +=
                        `
                        <tr>
                            <td>${dataTeam.position}</td>
                            <td><img src="${urlTeamImage}" alt="${dataTeam.team.name}" class="responsive-img" width="30"></td>
                            <td>${dataTeam.team.name}</td>
                            <td>${dataTeam.playedGames}</td>
                            <td>${dataTeam.won}</td>
                            <td>${dataTeam.draw}</td>
                            <td>${dataTeam.lost}</td>
                            <td>${dataTeam.goalsFor}</td>
                            <td>${dataTeam.goalsAgainst}</td>
                            <td>${dataTeam.goalDifference}</td>
                            <td>${dataTeam.points}</td>
                        </tr>
                        `
                    })
                    document.getElementById('progress').style.display = 'none'
                    document.getElementById('standings').innerHTML = standingsHTML
                })
                .catch(err => console.log(err))
            }
        })
        
    }
    
    
    fetch(`${base_url}/v2/competitions/${leagueID}/standings`,{
        headers:{
            'X-Auth-Token' : api_token
        }
    })
    .then(status)
    .then(res => res.json())
    .then(data => {
        let standingsHTML = ''
        data = data.standings[0].table

        data.forEach(dataTeam => {
            let urlTeamImage = dataTeam.team.crestUrl
            urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
            standingsHTML +=
            `
            <tr>
                <td>${dataTeam.position}</td>
                <td><img src="${urlTeamImage}" alt="${dataTeam.team.name}" class="responsive-img" width="30"></td>
                <td>${dataTeam.team.name}</td>
                <td>${dataTeam.playedGames}</td>
                <td>${dataTeam.won}</td>
                <td>${dataTeam.draw}</td>
                <td>${dataTeam.lost}</td>
                <td>${dataTeam.goalsFor}</td>
                <td>${dataTeam.goalsAgainst}</td>
                <td>${dataTeam.goalDifference}</td>
                <td>${dataTeam.points}</td>
            </tr>
            `
        })
        document.getElementById('progress').style.display = 'none'
        document.getElementById('standings').innerHTML = standingsHTML
    })
    .catch(err => console.log(err))
}

const getTeams = leagueID => {
    if('caches' in window){
        caches.match(`${base_url}/v2/competitions/${leagueID}/teams`)
            .then(res => {
                if(res){
                    res.json()
                        .then(data => {
                            let teamsHTML = ''
                            data = data.teams
                            data.forEach(team => {
                                let urlTeamImage = team.crestUrl
                                urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
                                teamsHTML  +=
                                `
                                <div class="card row">
                                    <div class="col s12">
                                        <div class="col s12">
                                            <div class="card-content  z-depth-3">
                                                <div class="row s6 center-align" class="logo-team">
                                                    <img src="${urlTeamImage}" alt="${team.name}" class="responsive-img center-align" width="50%" >
                                                </div>
                                                <div class="row s8 information-team">
                                                    <span class="badge-blue"><strong>${team.name}</strong></span>
                                                    <span><p class="p-bold">Stadium:</p> ${team.venue}</span><hr>
                                                    <span><p class="p-bold">Address:</p> ${team.address}</span><hr>
                                                    <span><p class="p-bold">Website:</p> ${team.website}</span><hr>
                                                    <span><p class="p-bold">Website:</p><a href="${team.website}" >${team.website}</a></span><hr>
                                                    <span>
                                                    <a onclick="addFavoriteTeam(${team.id},
                                                        '${urlTeamImage}',
                                                        '${team.name}',
                                                        '${team.venue}',
                                                        '${team.address}',
                                                        '${team.website}'
                                                        )" class="btn-floating btn-large waves-effect waves-light yellow accent-3 right">
                                                        <i class="material-icons">add</i>
                                                        </a>
                                                    </span>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                `
                            })
                            document.getElementById('progress').style.display = 'none'
                            document.getElementById('teams').innerHTML = teamsHTML
                        })
                }
            })
        
    }
    fetch(`${base_url}/v2/competitions/${leagueID}/teams`,{
        headers : {
            'X-Auth-Token' : api_token
        }
    })
    .then(status)
    .then(res => res.json())
    .then(data => {
        let teamsHTML = ''
        data = data.teams
        data.forEach(team => {
            let urlTeamImage = team.crestUrl
            urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
            teamsHTML  +=
            `
            <div class="card row">
                <div class="col s12">
                    <div class="col s12">
                        <div class="card-content">
                            <div class="row s6 center-align" class="logo-team">
                                <img src="${urlTeamImage}" alt="${team.name}" class="responsive-img center-align" width="50%" >
                            </div>
                            <div class="row s8 information-team">
                                <span class="badge-blue"><strong>${team.name}</strong></span>
                                <span><p class="p-bold">Stadium:</p> ${team.venue}</span><hr>
                                <span><p class="p-bold">Address:</p> ${team.address}</span><hr>
                                <span><p class="p-bold">Website:</p><a href="${team.website}" >${team.website}</a></span><hr>
                                <span>
                                    <a onclick="addFavoriteTeam(${team.id},
                                        '${urlTeamImage}',
                                        '${team.name}',
                                        '${team.venue}',
                                        '${team.address}',
                                        '${team.website}'
                                    )" class="btn-floating btn-large waves-effect waves-light yellow accent-3 right">
                                    <i class="material-icons">add</i>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        })
        document.getElementById('progress').style.display = 'none'
        document.getElementById('teams').innerHTML = teamsHTML
    })
    .catch(err => console.log(err))
}

export default {
    getStandings,
    getTeams
}
