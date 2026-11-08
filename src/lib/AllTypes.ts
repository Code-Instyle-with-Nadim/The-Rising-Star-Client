export interface StudioData {
    "_id": string,
    "title": string,
    "category": string,
    "hourlyRate": number,
    "securityDeposit": number,
    "maxCapacity": number,
    "location": string,
    "imageUrl": string,
    "images": string[],
    "amenities": string[],
    "overview": string,
    "rating": number,
    "reviewCount": number,
    "hostName": string,
    "hostEmail": string,
    "createdAt": string,
  
}

export interface ParamsType {
    id: string
}

export interface User {
 id: string;
 createdAt: Date;
 updatedAt: Date;
 email: string;
 emailVerified: boolean;
 name: string;
 image?: string | null ;
} 

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled"

export interface BookingData {
  _id: string
  studioId: string
  studioTitle: string
  studioImage?: string
  studioLocation?: string
  userEmail: string
  userName: string
  bookingDate: string
  startTime: string
  endTime: string
  totalPrice: number
  securityDeposit?: number
  status: BookingStatus
  createdAt: string
  updatedAt?: string
}