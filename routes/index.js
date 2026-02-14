var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts');
var emails = require('./../inc/emails');
var router = express.Router();

/* GET home page. */

module.exports = function(io){

  router.get('/', function(req, res, next) {

    menus.getMenus().then(results =>{

      res.render('index', {
        title: 'Restaurante Saboroso!',
        menus: results,
        isHome: true
      });

    });

  });

  router.get('/contacts', function(req, res, next) {

    contacts.render(req, res);

  });

  router.post('/contacts', function(req, res, next) {

    if(!req.body.name){
      contacts.render(req, res, 'Digite seu nome!');
    }else if(!req.body.email){
      contacts.render(req, res, `${req.body.name} digite seu e-mail!`);
    }
    else if(!req.body.message){
      contacts.render(req, res, `${req.body.name} escreva o que tem a nos dizer!`);
    }else{

      contacts.save(req.body).then(results =>{

        io.emit('dashboard update');

        contacts.render(req, res, null, "Contato enviado com sucesso!");

      }).catch(err=>{

        contacts.render(req, res, `Prezado ${req.body.name} tivemos um problema com sua reserva. Ocorreu um erro no servidor. Nossa equipe foi notificada.`);

        console.error(err);

      });

    }

  });

  router.get('/menus', function(req, res, next) {

    menus.getMenus().then(results=>{

      res.render('menus', {
        title: 'Menus - Restaurante Saboroso!',
        background: 'images/img_bg_1.jpg',
        h1: 'Saboreie nosso menu!',
        menus: results
      });

    });

  });

  router.get('/reservations', function(req, res, next) {

    console.log(req.body);

    reservations.render(req, res);

  });
  router.post('/reservations', function(req, res, next) {

    if(!req.body.name){

      reservations.render(req, res, "Digite um nome.");

    }else if(!req.body.email){

      reservations.render(req, res, `Digite seu email ${req.body.name}.`);

    }else if(!req.body.people){
      
      reservations.render(req, res, `Selecione o número de pessoas ${req.body.name}.`);

    }else if(!req.body.date){

      reservations.render(req, res, `Digite uma data válida ${req.body.name}.`);

    }else if(!req.body.time){

      reservations.render(req, res, `Digite uma hora válida ${req.body.name}.`);

    }else{

      reservations.save(req.body).then(results=>{

        let formatDate = req.body.date.split('-');

        formatDate = `dia ${formatDate[2]}/${formatDate[1]}/${formatDate[0]}`;

        req.body = {};

        io.emit('dashboard update');

        reservations.render(req, res, null, `Prezado ${req.body.name} sua reserva foi feita com sucesso te esperamos no ${formatDate} as ${req.body.time}`);

      }).catch(err=>{

        reservations.render(req, res, `Prezado ${req.body.name} tivemos um problema com sua reserva. Ocorreu um erro no servidor. Nossa equipe foi notificada.`);

        console.error(err);

      });

    }

  });

  router.get('/services', function(req, res, next) {

    res.render('services', {
      title: 'Serviços - Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'É um prazer poder servir!'
    });

  });

  router.post('/subscribe', function(req, res, next){

    emails.save(req).then(results=>{

      res.send(results);
      console.log('------------', results)

    }).catch(err=>{

      console.log('------------', err)
      res.send(err);

    });

  });

  return router;

};
