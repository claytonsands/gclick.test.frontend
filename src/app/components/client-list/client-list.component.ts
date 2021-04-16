import { Paths } from './../../util/paths';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from './../../models/client';
import { CrudService } from './../../services/crud.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: Client[];
  totalRecords: number;
  loading: boolean;
  selectedClient: Client;

  cols: any[];

  constructor(private crudService: CrudService,
    private router: Router) {
    }

  ngOnInit() {
    this.initCols();
    this.reloadData();
  }

  private initCols(): void {
    this.cols = [
      { field: 'subscription', header: 'Inscrição', class: 'width-20' },
      { field: 'name', header: 'Nome', class: 'width-40' },
      { field: 'nickname', header: 'Apelido', class: 'width-20' },
      { field: 'status', header: 'Status', class: 'width-20' }
    ];
  }

  reloadData() {
    this.loading = true;
    this.crudService.get(`${Paths.CLIENT}`).subscribe(resp => {
      this.clients = resp.content
      this.loading = false;
      this.totalRecords = resp.totalElements;
    });
  }

  clientDetails(event){
    this.router.navigate(['details', event.data.id]);
  }

}
