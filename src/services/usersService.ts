import  { supabase } from "./supabase";    

async function findAll(){
   const { data } = await supabase
    .from("users")
    .select()
    .order("name")
    .returns<UsersResponse[]>()

    return data ?? []
    
}

export {  findAll }