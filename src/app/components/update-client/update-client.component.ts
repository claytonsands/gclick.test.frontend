import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { CrudService } from './../../services/crud.service';
import { Paths } from './../../util/paths';
import { Status } from './../../util/status';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  id: number;
  client: Client;
  status: Status[];
  selectedStatus: Status;

  constructor(private route: ActivatedRoute, private router: Router,
    private crudService: CrudService) {
      this.status = [
        { value: 0, label: 'Desativado' },
        { value: 1, label: 'Ativado' },
        { value: 2, label: 'Suspenso' }
      ];
    }

  ngOnInit() {
    this.client = new Client();

    this.id = this.route.snapshot.params['id'];
    
    this.crudService.get(`${Paths.CLIENT}/${this.id}`)
      .subscribe(data => {
        console.log(data)
        this.client = data;
      }, error => console.log(error));

  }

  updateClient() {
    if(this.selectedStatus != null)
      this.client.status = this.selectedStatus.value;
    this.crudService.put(`${Paths.CLIENT}/${this.id}`, this.client)
      .subscribe(data => {
        console.log(data)
        this.client = new Client();
        this.backClientDetails();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateClient();    
  }
  
  backClientDetails(){
    this.router.navigate(['details', this.id]);
  }

}
