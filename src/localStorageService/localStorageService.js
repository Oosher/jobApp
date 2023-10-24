

export const getLikedLocations = async ()=>{

    return JSON.parse(localStorage.getItem("likedLocations"));

}

export const saveLikedLocationsToLocalStorage = async (location)=> {

    let likedLocations = await getLikedLocations();

    if (likedLocations) {
        
        likedLocations.push(location);

        localStorage.setItem("likedLocations",JSON.stringify(likedLocations));

    }else{

        likedLocations = [];

        likedLocations.push(location);

        localStorage.setItem("likedLocations",JSON.stringify(likedLocations));

    }

} 

export const removeLikedLocation =async (locationName) =>{

    const updatedLikedLocations = await getLikedLocations();

    await localStorage.setItem("likedLocations",JSON.stringify(updatedLikedLocations?.filter((loc)=>loc.name!==locationName)));

    if (await !updatedLikedLocations) {
        await localStorage.setItem("likedLocations","[]");
    }
}



