import { Status } from './../../util/status';
import { Paths } from './../../util/paths';
import { CrudService } from './../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  client: Client = new Client();
  status: Status[];
  selectedStatus: Status;

  constructor(private crudService: CrudService,
    private router: Router) {
    this.status = [
      { value: 0, label: 'Desativado' },
      { value: 1, label: 'Ativado' },
      { value: 2, label: 'Suspenso' }
    ];
  }

  ngOnInit() {
  }

  save() {
    this.client.status = this.selectedStatus.value;
    this.crudService
      .post(`${Paths.CLIENT}`, this.client).subscribe(data => {
        console.log(data)
        this.client = new Client();
        this.gotoList();
      },
        error => console.log(error));
  }

  gotoList() {
    this.router.navigate(['/clients']);
  }

}
