import { Component, OnInit } from '@angular/core'; //se suma OnInit

//clase Tarea de tarea.ts dentro de models
import { Tarea } from 'src/app/models/tarea';

//Conexion a la api local declarada en api-tareas.service.ts
import { ApiTareasService } from 'src/app/services/api-tareas.service';


@Component({
  selector: 'app-eliminar-tarea',
  templateUrl: './eliminar-tarea.component.html',
  styleUrls: ['./eliminar-tarea.component.css']
})
export class EliminarTareaComponent implements OnInit {
  tareas: Tarea[] = []; // Variable para almacenar las tareas
  
  
  constructor(private apiServiceTareas: ApiTareasService){}

  ngOnInit(): void {
    this.cargarTareas();
  }

  /**
   * @method cargarTareas
   * Trae un array del tipo Tarea definido en models tarea.ts
   */
  cargarTareas(){
    console.log(`Cargando tareas...`) 
    this.apiServiceTareas.getTareas().subscribe({
      next: data =>{
        console.log(data)
        this.tareas = data;
        console.log(`Tareas cargadas`) 
      }, error: error => {
        console.log(error)
      }
    })
  }



 /**
  * @method eliminarTarea
  * @param id 
  * Recibe un parámetro _id del tipo string o number necesario para deleteTareaById (funcion de mongoose)
  */
  eliminarTarea(id: string | number): void {

    this.apiServiceTareas.deleteTareaById(id).subscribe({
      
      next: () => {
        console.log('Tarea eliminada exitosamente');
        this.cargarTareas();
      },
      error: error => {
        console.error('Error al eliminar tarea:', error);
      }
    });
  }
  



 /**
  * @method buscarTarea
  * @param event 
  * Recibe un parámetro evento
  * Si éste es una instancia de HTMLInputElement
  */
  buscarTarea(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const buscarAsig = event.target.value.toLowerCase();
      if (buscarAsig) {
        this.tareas = this.tareas.filter(tarea => tarea.asignado.toLowerCase().includes(buscarAsig));
      } else {
        this.cargarTareas(); 
      }
    }
  }


}
