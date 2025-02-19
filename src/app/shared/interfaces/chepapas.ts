export interface Chepapas {
    _id: string;
    displayName: string; //nombre
    formattedAddress: string; //direccion del lugar
    urlImages: string,
    location: { latitude: number; longitude: number }; //ubucacion
    rating: number; //promedio de raring
    userRatingCount: number; //conteo de votacines tanto de rating, como de dislike como de super papa
    rateTinder: { likes: number; dislike: number; superPapa: number }; //resutlado de las opniones
    hours:string, // horario como texto
    description:string, //descripcion corta del lugar
    salsas: { //Lista de salsas
      name:string, //nombre dela salsa
      picor:number // 1 -3 picor del 1- 3
    }[],
    categorias:Categories[],
    active:boolean,

  }

  export  interface Categories {
    icon:string, //icono lucided de reac
    name:string // nombre de la categoria
  }