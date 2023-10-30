

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




export const saveToggles  = async (isCelsius,dark)=>{

    let toggles =await getToggles();;

    if (!toggles) {
        toggles = {};
    } 

    if (typeof isCelsius === "boolean") {

        toggles.isCelsius=isCelsius;

        
    }


    if (typeof dark=== "boolean") {

        toggles.dark=dark
        
    }


    await localStorage.setItem("toggles",JSON.stringify(toggles))

} 



export const getToggles = async ()=>JSON.parse(localStorage.getItem("toggles"));