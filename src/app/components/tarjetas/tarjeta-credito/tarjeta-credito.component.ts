import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.sass']
})
export class TarjetaCreditoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  suscription!: Subscription;
  tarjeta : TarjetaCredito = {};
  idTarjeta = 0;

  constructor(private fb: FormBuilder, private tarjetaService : TarjetaService,private toastr : ToastrService) {
    this.form = this.fb.group({
      id: 0,
      titular: ['',[Validators.required]],
      numeroTarjeta: ['',[Validators.required, Validators.maxLength(16),Validators.minLength(16)]],
      fechaExpiracion: ['',[Validators.required, Validators.maxLength(5),Validators.minLength(5)]],
      cvv: ['',[Validators.required, Validators.maxLength(3),Validators.minLength(3)]]
    })
  }
  

  ngOnInit(): void {
    this.suscription = this.tarjetaService.obtenerTarjeta$().subscribe(data => {
      console.log(data);
      this.tarjeta = data;
      this.form.patchValue({
        titular: this.tarjeta.titular,
        numeroTarjeta: this.tarjeta.numeroTarjeta,
        fechaExpiracion: this.tarjeta.fechaExpiracion,
        cvv: this.tarjeta.cvv
      });
      this.idTarjeta = this.tarjeta.id;
    })
  }

  guardarTarjeta(){
    if(this.idTarjeta === 0) {
      this.agregar();
    } else {
      this.editar();
    } 
  }

  agregar() {
    const tarjeta : TarjetaCredito = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }
    this.tarjetaService.guardarTarjeta(tarjeta).subscribe((data) => {
      this.toastr.success("Registro Agregado",'La tarjeta fue agregada');
      this.tarjetaService.obtenerTarjetas();
      this.form.reset();
    });
  }

  editar() {
    const tarjeta : TarjetaCredito = {
      id: this.tarjeta.id,
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }
    this.tarjetaService.actualizarTarjeta(this.idTarjeta, tarjeta).subscribe( data => {
      this.toastr.info("Registro Actualizado",'La tarjeta fue actualizada');
      this.tarjetaService.obtenerTarjetas();
      this.form.reset();
      this.idTarjeta = 0;
    })
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

}
