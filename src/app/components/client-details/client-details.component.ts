import { Email } from './../../models/email';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Client } from './../../models/client';
import { CrudService } from './../../services/crud.service';
import { Paths } from './../../util/paths';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ClientDetailsComponent implements OnInit {
  emailDialog: boolean;
  id: number;
  client: Client;
  emails: Email[];
  clonedEmails: { [s: string]: Email; } = {};
  email: Email;
  submitted: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private crudService: CrudService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.client = new Client();

    this.id = this.route.snapshot.params['id'];

    this.crudService.get(`${Paths.CLIENT}/${this.id}`)
      .subscribe(data => {
        this.client = data;
        this.emails = this.client.emails;
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['clients']);
  }

  updateClient(id: number) {
    this.router.navigate(['update', id]);
  }

  deleteClient(id: number) {
    this.crudService.delete(`${Paths.CLIENT}/${id}`)
      .subscribe(
        data => {
          console.log(data);
          if (data) {
            this.messageService.add({ severity: 'info', summary: 'Cliente excluído', detail: 'a' });
            this.list()
          }
        },
        error => console.log(error));
  }

  onRowEditInit(email: Email) {
    this.clonedEmails[email.id] = { ...email };
  }

  onRowEditSave(email: Email) {
    this.crudService.put(`${Paths.EMAIL}/${email.id}`, email).subscribe(resp => {
      delete this.clonedEmails[email.id];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Email atualizado' });
    })
  }

  openNew() {
    this.email = new Email();
    this.submitted = false;
    this.emailDialog = true;
  }
  
  hideDialog() {
    this.emailDialog = false;
    this.submitted = false;
  }
  
  saveEmail() {
    this.submitted = true;
    this.email.clientId = this.id;
    this.crudService.post(`${Paths.EMAIL}`, this.email).subscribe(() =>{
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Email incluído', life: 3000 })
      this.emails.push(this.email);
      this.hideDialog();
    })
  }

  onRowEditCancel(email: Email, index: number) {
    this.emails[index] = this.clonedEmails[email.id];
  }

  deleteEmail(email: Email) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja apagar ' + email.email + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.crudService.delete(`${Paths.EMAIL}/${email.id}`).subscribe(e => {
          this.emails = this.emails.filter(val => val.id !== email.id);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Email excluído', life: 3000 });
        });
      }
    });
  }
}
