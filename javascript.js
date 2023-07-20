class Producto{
  constructor(name, id, type, price){
      this.name = name;
      this.id = id;
      this.type = type;
      this.price = price;
      
      
  }
}


// Array
const ProductoDefault = [
  {
      name:"Cherry Glazerr Face T-Shirt", 
      id:"001", 
      type:"Clothes", 
      price:25, 
       
      
  },

  {  
     name:"Stuffed & Ready", 
      id:"003",
      type:"Discs", 
      price:"9",
     
      
    },

  { 
      name:"Apocalipstick", 
      id:"004",
      type:"Discs",
      price:9, 
      
      },


 
]
// local storage
const productos = JSON.parse(localStorage.getItem("productos")) || [] 
const compras = JSON.parse(localStorage.getItem("compras")) || []
let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const selectorTipo = document.getElementById("tipoProducto")
selectorTipo.onchange = (evt)=>{
    const tipoSeleccionado =  evt.target.value
    if(tipoSeleccionado === "0"){
        generarProductos(productos)
    } else {
        generarProductos(productos.filter(prod=>prod.type === tipoSeleccionado))
    }
}

const agregarProductos = ({name, id, type, price})=>{

  if(productos.some(prod=>prod.id===id)){
  } 
  
  else {
      const productoNuevo = new Producto(name, id, type, price)
      productos.push(productoNuevo)
      localStorage.setItem('productos', JSON.stringify(productos))
  }
}

const agregarCarrito = (objetoCarrito)=>{

  carrito.push(objetoCarrito)

  totalDelCarritoMostrar ()
  
}
const mostrarCarrito = ()=>{
  const listadoCarrito = document.getElementById("listadoCarrito")
  listadoCarrito.innerHTML=""
  carrito.forEach(({name, price, quantity, id}) =>{
      let elementoLista = document.createElement("li")
      elementoLista.innerHTML=` <h6> ${name} (${quantity}) </h6>    $${price}    <button id ="eliminarCarrito${id}" class="boton-limpiarCarrito btn">X</button>`
      listadoCarrito.appendChild(elementoLista)
      const botonBorrar = document.getElementById(`eliminarCarrito${id}`)
      botonBorrar.addEventListener("click",()=>{
          carrito = carrito.filter((elemento)=>{
              if(elemento.id !== id){
                  return elemento
              }
          })
          let carritoString = JSON.stringify(carrito)
          localStorage.setItem("carrito", carritoString)
          mostrarCarrito()
      })
      let carritoString = JSON.stringify(carrito)
      localStorage.setItem("carrito", carritoString)
  })
}

const borrarCarrito = ()=>{
  carrito.length = 0 
  let carritoString = JSON.stringify(carrito)
  localStorage.setItem("carrito", carritoString)
  mostrarCarrito()
}

const productosPreexistentes = ()=>{

  if (productos.length===0){
      ProductoDefault.forEach(prod=>{
          let ingreso = JSON.parse(JSON.stringify(prod))
         agregarProductos(ingreso)}
          )
  }
}

const totalDelCarrito = ()=>{
  let total = carrito.reduce((acumulador, {price, quantity})=>{
      return acumulador + (price*quantity)
  }, 0)
  return total
}
const totalDelCarritoMostrar  = ()=>{
  const carritoTotal = document.getElementById("carritoTotal")
  carritoTotal.innerHTML=`<h2> $${totalDelCarrito() } </h2>`
}




const generarProductos = (arrayUtilizado)=>{

    const contenedorProductos = document.getElementById("contenedorProductos")
    contenedorProductos.innerHTML = ""
    arrayUtilizado.forEach(({name, id, type, price, stock})=>{
        const prodCard = document.createElement("div")
        prodCard.classList.add("col-xs")
        prodCard.classList.add("card")
        
        prodCard.id = id
        prodCard.innerHTML = `

        
        <h5 class="card-titulo">${name}</h5>        
        <img src="./images/${name+id}.webp" class="card-img-top" alt="${name}">
                <div class="card-body">
                    
                    
                <h5><span>$ ${price}</span></h5>
                 
        
                    <form id="form${id} class="form-cant">
                        <label class="p-2" for="contador${id}">
                        QT</label>

                        <input class="p-2 m-1" type="number" placeholder="0" id="contador${id}" >

                        <button class="btn btn btn-dark m-3" id="botonProd${id}">
                        Add to cart</button>
                    </form>
                </div>`
        contenedorProductos.appendChild(prodCard)
        const btn = document.getElementById(`botonProd${id}`)
        
        btn.addEventListener("click",(e)=>{
          e.preventDefault()
            const contadorQuantity = Number(document.getElementById(`contador${id}`).value)
            if(contadorQuantity>0){
                agregarCarrito({name, id, type, price, quantity:contadorQuantity})
                mostrarCarrito()
                const form = document.getElementById(`form${id}`)
                form.reset()
            }
        }) 
    })
}
const finalizarCompra = (event)=>{
  const data = new FormData(event.target)
  const cliente = Object.fromEntries(data)
  const ticket = {
    cliente: cliente, 
    total:totalDelCarrito(),
    id:compras.length, 
    productos:carrito} 
  compras.push(ticket)
  localStorage.setItem("compras", JSON.stringify(compras))
  
  borrarCarrito()
  let mensaje = document.getElementById("carritoTotal")
  mensaje.innerHTML = "<h1>Thank you for buying</h1>"

}


const compraFinal = document.getElementById("formCompraFinal")
compraFinal.addEventListener("submit",(event)=>{
    
    event.preventDefault()
    if(carrito.length>0){
        finalizarCompra(event)
    } else {
        
    }
})



const ejecutarTienda = ()=>{
    productosPreexistentes()
    generarProductos(productos)
    mostrarCarrito()
    totalDelCarritoMostrar ()
}


ejecutarTienda()

