'use strict'

/*
|--------------------------------------------------------------------------
| Routes
  Existen 2 grupos de rutas: Las que necesitan autenticación del usuario y las que no. TOMAR MUY EN CUENTA ESTO
  Dentro del grupo de las que necesitan autenticación se debe especificar el middleware para verificar si el
  usuario(autenticado) tiene el permiso para acceder a esa ruta. Ejemplo: .middleware('verifyPermission:1')
  El número 1 indica el permiso que debe tener para acceder a esa ruta
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return {
    greeting: 'Hello world in JSON'
  }
})

const addPrefixToGroup = group => {
  // Grupo para rutas con prefijo /api/
  group.prefix("api");
  return group;
};


addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas sin protección de autenticación aquí
    Route.post("login", "UserController.login");
    Route.post("register", "UserController.register")
    Route.get("validate_email/:email", "UserController.validateEmail")
    Route.get("plans", "PlanController.index")
    Route.post("register_upload", "UploadController.registerUpload")
    Route.post("register_upload_img_profile", "UploadController.saveImageProfile")
    Route.post("get_file_by_directory", "UploadController.getFileByDirectory")
    Route.get("prueba_correo", "ContratoController.pruebaCorreo")
    Route.get("file2/:dir", "UploadController.getFileByDirectory2");
    Route.get("file3/:dir", "UploadController.getFileByDirectory3");
  })
);

addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas con protección de autenticación aquí
    Route.post("contrato", "ContratoController.store");
    Route.get("contrato/:id", "ContratoController.show");
    Route.put("update_check/:id", "ContratoController.updateCheck");
    Route.put("update_check_alone/:id", "ContratoController.updateCheckAlone");
    Route.get("contratos_pendientes", "ContratoController.getContractsByPending");
    Route.get("user_info", "UserController.getUserInfo");
    Route.put("update_status/:id", "ContratoController.updateStatus")
    Route.get("get_contracts/:status", "ContratoController.getContractByStatus")
    Route.get("mis_contratos_pagados", "ContratoController.misContratosPagados")
    Route.put("actualizar_contrato/:id", "ContratoController.actualizarContratoVigencia")

  }).middleware("auth")
);
