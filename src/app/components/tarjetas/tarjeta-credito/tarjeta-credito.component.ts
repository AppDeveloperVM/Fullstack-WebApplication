import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.sass']
})
export class TarjetaCreditoComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private tarjetaService : TarjetaService) {
    this.form = this.fb.group({
      id: 0,
      titular: ['',[Validators.required]],
      numeroTarjeta: ['',[Validators.required, Validators.maxLength(16),Validators.minLength(16)]],
      fechaExpiracion: ['',[Validators.required, Validators.maxLength(5),Validators.minLength(5)]],
      cvv: ['',[Validators.required, Validators.maxLength(3),Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
  }

  guardarTarjeta(){
    const tarjeta : TarjetaCredito = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }
    this.tarjetaService.guardarTarjeta(tarjeta).subscribe((data) => {
      console.log("Guardado exitosamente: "+ data);
      this.form.reset();
      
    })
    
  }

}
