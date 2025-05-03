import { Photo } from "@/types/photo";

export async function fetchPhotos(): Promise<Photo[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/photos/`, {
      next: { revalidate: 60 }, // ISR (optional)
    });
  
    if (!res.ok) throw new Error("Failed to fetch photos");
    const data = await res.json();
    
    console.log("Fetched Photos:", data);  // Log the response data to ensure it has the correct structure
  
    return data;
  }
  

export async function login(username: string, password: string): Promise<string> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!res.ok) throw new Error('Failed to log in');
    
    const data = await res.json();
    const token = data.token;
  
    // Store the token in localStorage (or cookies)
    localStorage.setItem('token', token);
  
    return token;
  }
  
  