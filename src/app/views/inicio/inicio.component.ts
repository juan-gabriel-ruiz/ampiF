import { Component, ElementRef, ViewChild } from '@angular/core';
import { Tarea } from 'src/app/models/tarea';
import { ApiTareasService } from 'src/app/services/api-tareas.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  tareas: Tarea[]=[];
  tareasTotal: Tarea[]=[];
  cargando: Boolean = true;
  error: Boolean = false;
  @ViewChild('errorModal') errorModal?: ElementRef;
  
  constructor(private apiTareasService: ApiTareasService){}

  ngOnInit(){
    this.cargarTareas();
  }

  cargarTareas(){
    this.apiTareasService.getTareas().subscribe({next:res=>{
      this.tareas = res;
      this.tareasTotal = res;
      this.cargando = false;
    },
    error: err=>{
      console.log("Error al obtener tareas: " + err.message);
      this.error = true;
      this.cargando = false;
    }});
  }

  buscarTarea(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const buscarAsig = event.target.value.toLowerCase();
      if (buscarAsig) {
        this.tareas = this.tareas.filter(tarea => tarea.asignado.toLowerCase().includes(buscarAsig));
      } else {
        this.tareas = this.tareasTotal;
      }
    }
  }

}
