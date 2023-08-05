const ExpRegNombre = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
    ExpRegTitulo = /^[\w\s():\-?!¡¿áéíóúÁÉÍÓÚüÜñÑ"]+$/i,
    ExpRegURL = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
    ExpRegEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
    ExpRegAsunto = /^[A-Za-z0-9\s\-\_\.\,\!\?\']+$/,
    ExpRegMensaje =/^[A-Za-z0-9\s\-\_\.\,\!\?\áéíóúÁÉÍÓÚüÜñÑ']+$/i,
    ExpRegTexto = /^[\x00-\xFF]*$/,
    ExpRegPass = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

module.exports  ={
    ExpRegNombre,
    ExpRegTitulo,
    ExpRegURL,
    ExpRegEmail ,
    ExpRegAsunto ,
    ExpRegMensaje,
    ExpRegTexto ,
    ExpRegPass 
  }
