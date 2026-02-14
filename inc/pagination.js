const { text } = require('express');
const conn = require('./db');

class Pagination {

    constructor(
        query,
        params = [],
        itensPerPage = 10
    ){
        this.query = query;
        this.params = params;
        this.itensPerPage = itensPerPage;
        this.currentPage = 1;
    }

    getPage(page){

        this.currentPage = page - 1;

        this.params.push(
            this.currentPage * this.itensPerPage,
            this.itensPerPage
        );

        return new Promise((resolve, reject)=>{

            conn.query([this.query, "SELECT FOUND_ROWS() AS FOUND_ROWS"].join(';'), this.params, (err, results)=>{

                if(err){
                    reject(err);
                } else{

                    this.data = results[0];
                    this.total = results[1][0].FOUND_ROWS;
                    this.totalPages = Math.ceil(this.total / this.itensPerPage);
                    this.currentPage++;

                    resolve(this.data);

                }

            });

        });

    }
    getTotal(){

        return this.total;

    }
    getCurrentpage(){

        return this.currentPage;

    }
    getTotalPages(){

        return this.totalPages;

    }
    getNaigation(params){

        let limitPagesNav = 5;
        let links = [];
        let nrstart = 0;
        let nrend = 0;

        if(this.getTotalPages() < limitPagesNav){

            limitPagesNav = this.getTotalPages();

        }

        //se estamos nas primeiras páginas:
        if ((this.getCurrentpage() - parseInt(limitPagesNav / 2)) < 1){

            nrstart = 1;
            nrend = limitPagesNav;

        }
        //se estamos chegando nas últimas páginas
        else if((this.getCurrentpage() + parseInt(limitPagesNav/1)) > this.getTotalPages()){

            nrstart = !(this.getTotalPages() - limitPagesNav) || (this.getTotalPages() - limitPagesNav) == 0 ? 1 : this.getTotalPages() - limitPagesNav;
            nrend = this.getTotalPages();

        }
        //se estamos no meio
        else{

            nrstart = this.getCurrentpage() - Math.ceil(limitPagesNav / 2);
            nrend = this.getCurrentpage() + parseInt(limitPagesNav / 2);

        }

        if(this.getCurrentpage() > 1){

            links.push({
                text: '<',
                href: '?' + this.getQueryString(Object.assign({}, params, {page: this.getCurrentpage() - 1} )),
                active: false
            });

        }

        for(let x = nrstart; x <=nrend; x++){

            links.push({
                text: x,
                href: '?' + this.getQueryString(Object.assign({}, params, {page: x} )),
                active: (x === this.getCurrentpage())
            });

        }

        if(this.getCurrentpage() < this.getTotalPages()){

            links.push({
                text: '>',
                href: '?' + this.getQueryString(Object.assign({}, params, {page: this.getCurrentpage() + 1} )),
                active: false
            });

        }

        return links;

    }
    getQueryString(params){

        let queryString = [];

        for(let name in params ){

            queryString.push(`${name}=${params[name]}`);

        }

        return queryString.join('&');

    }

}

module.exports = Pagination;