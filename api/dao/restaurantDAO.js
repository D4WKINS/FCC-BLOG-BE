let restaurants; //stores reference to our data base

export default class RestaurantsDAO{
    //conn = connect
    static async injectDB(conn){  //injectDB method is how we establish a connection to our database  
        if (restaurants){         // as soon as our server starts the injectDB method is called
            return                // then we get a reference to our restaurants database
        }
        try{// if restaurants is not defined await connection to database via the db endpoint located inside our env file which directs us to the collection called restaurants
                     //connect to db --------> name of DB -------> locate collection called restaurants --> return result to restaurants var
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        }
        catch(e){// in the event that we cannot find a collection by the name of restaurants
            console.error(`Unable to establish a collection handle in restaurantsDAO: ${e}`)
        }
    }


static async getRestaurants({//This function is called when we want to get a list of all restaurants

    filters = null, // When calling this method we can define a filter to filter info
    page = 0 ,//Which page number you
    restaurantsPerpage = 20,//Maximum 20 restaurants to be displayed per page

} = {}) {

    let query
    if(filters){// if filters variable is equivalent to any of string values/queries tested in the conditions below
                // re-assign the query variable to the result of
        if("name" in filters){
            query = { $text: { $search: filters["name"] } }//$text indicates a text search, which means if anywhere in the text the characters of the text match the "name" that was passed in, and returns all restaurants that match the "name" that was passed in
        }else if("cuisine" in filters){
            query = {"cuisine": {$eq: filters["cuisine"] } } // if "cuisine" from the entry of the DB $eq/equals/===  the "cuisine"  that was passed in,
                                                             // filters["cuisine"] means when we called the getRestaurants method we passed in a filter for what type cuisine we are looking for, this then returns all cuisines matching the one we have passed in
        
        }else if ("zipcode" in filters){
            query = {"address.zipcode": { Seq: filters["zipcode"] } }
   
     }
  }
  let cursor

  try{
      cursor = await restaurants.find(query)
       //Finds all restaurants in our database that matches the query that was passed in if no query provided, it will return all restaurants
  }catch(e){
    console.error(`Unable to issue find command, ${e}`)
    return { restaurantsList: [], totalNumRestaurants: 0}// if nothing is found return an error with an empty list
  }

    const displayCursor = cursor.limit(restaurantsPerpage).skip(restaurantsPerpage * page)//Limits the results to 20 result per page, we ue .skip(), restaurantsPerPage = 20 * page = page number to get to a specific page of the results

    try{
        const restaurantsList = await displayCursor.toArray() // set restaurants list to an array []
        const totalNumRestaurants = page === 0 ? await restaurants.countDocuments(query) : 0 // if page === 0 return the array

        return { restaurantsList, totalNumRestaurants}
    }catch(e){
        console.error(
            `Unable to convert cursor to array or problem counting documents, ${e}`
        )
        return {restaurantsList: [], totalNumRestaurants:0}
        }
    }
}