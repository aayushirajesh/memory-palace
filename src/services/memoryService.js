import { supabase } from "./supabase";

export async function createMemory({
  title,
  content,
  mood,
  imageBase64,
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("memories")
    .insert([
      {
        user_id: user.id,
        title,
        content,
        mood,
        image_url: imageBase64,
      },
    ])
    .select()
    .single(); 
  if (error) throw error; 
  return data;
}

export async function fetchMemories() { 
  const { data, error } =
    await supabase
      .from("memories")
      .select("*")
      .order("created_at", {
        ascending: false,
      }); 
  if (error) throw error; 
  return data;
}

export async function deleteMemory(id) { 
  const { error } =
    await supabase
      .from("memories")
      .delete()
      .eq("id", id); 
  if (error) throw error;
}