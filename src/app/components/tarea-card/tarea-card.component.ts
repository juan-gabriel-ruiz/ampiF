import { Component, Input } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarea-card',
  templateUrl: './tarea-card.component.html',
  styleUrls: ['./tarea-card.component.css']
})
export class TareaCardComponent {
  @Input() tarea: Tarea = new Tarea();
  fechaFin: string = "";

  constructor(private datePipe: DatePipe, private ruta: Router){}

  ngOnInit(){
    this.fechaFin = this.formatearFecha(this.tarea.fecha_fin);
  }

  formatearFecha(fecha: Date):string{   
    let fechaFormateada = this.datePipe.transform(fecha, "dd/MM/yy")
    if(!fechaFormateada){
      fechaFormateada = "";
    }
    return fechaFormateada;
  }

  cambiarColorEstado(estado: string){
    switch(estado) {
      case 'Finalizado':
        return 'text-success';
      case 'En proceso':
        return 'text-warning';
      case 'Cancelado':
        return 'text-danger';
      default:
        return '';
    }
  }

  editarTarea() {
    this.ruta.navigate(['/editar', this.tarea._id]);
  }
}
