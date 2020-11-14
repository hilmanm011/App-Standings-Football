import api from './api.js'
import list from './list.js'

const loadPage = (path = 'home') => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
            let element = document.querySelector('#body-content')
            if(xhr.status == 200){
                element.innerHTML = xhr.responseText
                if(path === 'home'){
                    //feth Standings
                    api.getStandings(2021)
                }
                if(path === 'favorite'){
                    //fetch Favorite Team
                    list.getAllTeam()

                    //register list
                    window.deleteFavoriteTeam = list.deleteFavoriteTeam
                }
                if(path === 'teams'){
                    //fetch Teams
                    api.getTeams(2021)
                    //register list
                    window.addFavoriteTeam = list.addFavoriteTeam
                }
                
            }else if(xhr.status == 404){
                element.innerHTML = "<h1>Halaman Tidak Ditemukan</h1>"
            }else{
                element.innerHTML = "<h1>Maaf. halaman tidak dapat di akses!</h1>"
            }
        }
    }
    xhr.open('GET',`/src/pages/${path}.html`,true)
    xhr.send()
}

export default loadPage