window.onSpotifyWebPlaybackSDKReady = () => {
    const clientId = "a4237d8c0c1248a4a1597ff96c037bfa";
    const clientSecret = "43200dd272564aefa3806443c2672f8c";
    const playlistID = "27TAtLLhoRSg6N3gdlGBRz";
    
    //token fetch
    async function token(){
        var getToken = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
            },
            body: "grant_type=client_credentials",
          });
        var response = await getToken.json();
        return response;          
    }
    
    //playlist fetch
    token()
    .then(function (response) {
        var token = response.access_token;
        async function getPlayList(){
            var getPlayList = await fetch("https://api.spotify.com/v1/playlists/"+playlistID,
                {
                  method: "GET",
                  headers: { Authorization: "Bearer " + token },
                });
                var response = await getPlayList.json();
                return response;
        }
        getPlayList()
          .then(function (response) {
            console.log(response);
            //playlist header
            var head = document.createElement("div");
            head.setAttribute("class","container");
            var rowhead = document.createElement("div");
            rowhead.setAttribute("class","row");
            var col1 = document.createElement("div");
            col1.setAttribute("class","col-3");
            var img = document.createElement("img");
            img.setAttribute("src",response.images[0].url);
            img.setAttribute("id","mainimg");
            col1.append(img);
            var col2 = document.createElement("div");
            col2.setAttribute("class","col-9");
            col2.setAttribute("id","title");            
            var playlistname = response.name;
            col2.innerHTML = playlistname;
            //subtle elements
            var p1 = document.createElement("p");
            p1.setAttribute("class","p");
            p1.innerHTML = response.owner.display_name;
            var p2 = document.createElement("p");
            p2.setAttribute("class","myname");
            p2.innerHTML = response.type;
            var span = document.createElement("span");
            span.setAttribute("class","songs");
            span.innerHTML = response.tracks.items.length + " songs" ;
            rowhead.append(col1,col2);
            head.append(rowhead);

            //playlist display
            var table = document.createElement("table");
            table.setAttribute("class","table table-dark text-white table-hover");
            var headrow = document.createElement("thead");
            var number = document.createElement("th");
            number.innerHTML = "#";
            var headtitle = document.createElement("th");
            headtitle.innerHTML = "TITLE";
            var picture = document.createElement("th");
            picture.innerHTML = "";
            var headartist = document.createElement("th");
            headartist.innerHTML = "ALBUM";
            var headdate = document.createElement("th");
            headdate.innerHTML = "DATE ADDED";
            var headduration = document.createElement("th");
            headduration.innerHTML = "";
            var icon = document.createElement("i");
            icon.setAttribute("class","far fa-clock");
            headduration.append(icon);
            headrow.append(number,headtitle,picture,headartist,headdate,headduration);
            table.append(headrow);
            var tbody = document.createElement("tbody");

            //extracting details from api
            for(let i=0; i<response.tracks.items.length; i++){
                var row = document.createElement("tr");
                var num = document.createElement("td");
                num.innerHTML = i+1;
                var pictd = document.createElement("td");
                var pic = document.createElement("img");
                pic.setAttribute("class","playlistimgs");
                pic.setAttribute("src", response.tracks.items[i].track.album.images[0].url);
                pictd.append(pic);
                var title = document.createElement("td");
                title.innerHTML = response.tracks.items[i].track.album.name;
                var artist = document.createElement("td");
                artist.innerHTML = response.tracks.items[i].track.album.artists[0].name;
                var date = document.createElement("td");
                date.innerHTML = response.tracks.items[i].track.album.release_date;
                var duration = document.createElement("td");
                var dur = response.tracks.items[i].track.duration_ms/60000;
                duration.innerHTML = dur.toFixed(2);
                row.append(num,pictd,title,artist,date,duration);
                tbody.append(row);
                table.append(tbody);
            }
            
            document.body.append(p1,p2,span,head,img,table);
    
        });
    });
    token()
    .catch(function (err){
        console.log(err);
    })
};





