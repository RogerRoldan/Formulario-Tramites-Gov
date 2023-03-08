import { Component, OnInit } from '@angular/core';

import { TramitesService } from 'src/app/services/tramites.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NOMBRE_TRAMITE } from 'src/app/constants';

@Component({
  selector: 'app-radicar',
  templateUrl: './radicar.component.html',
  styleUrls: ['./radicar.component.css'],
})
export class RadicarComponent implements OnInit {
  NOMBRE_TRAMITE = NOMBRE_TRAMITE;
  etapa: number = 2;
  resultado: boolean = false;
  error: boolean = false;
  loading: boolean = false;

  estadoTramite: string = '';
  estadoError: string = '';
  usuarioTramite: string = '';
  formGroup: FormGroup;

  constructor(public httpService: TramitesService, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      tipo_documento: ['', [Validators.required]],
      numero_identificacion: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      tipo_licencia: ['', [Validators.required]],
      fecha_solicitud: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    let body: any = {
      variables: {
        numero_identificacion: {
          value: this.formGroup.get('numero_identificacion')?.value,
          type: 'string',
        },
        tipo_documento: {
          value: this.formGroup.get('tipo_documento')?.value,
          type: 'string',
        },
        nombre: {
          value: this.formGroup.get('nombre')?.value,
          type: 'string',
        },
        apellido: {
          value: this.formGroup.get('apellido')?.value,
          type: 'string',
        },
        tipo_licencia: {
          value: this.formGroup.get('tipo_licencia')?.value,
          type: 'string',
        },
        fecha_solicitud: {
          value: this.formGroup.get('fecha_solicitud')?.value,
          type: 'string',
        },
      },
    };

    this.loading = true;
    this.httpService.guardarDatos(body).subscribe(
      (data) => {
        console.log(data);
        this.etapa = 3;
        this.estadoTramite = data;
        this.resultado = true;
        this.loading = false;
        this.formGroup.reset();
      },
      (error) => {
        console.log(error);
        this.etapa = 4;
        this.loading = false;
        this.resultado = false;
        this.error = true;
        console.log(error);
        this.estadoError = 'Ocurrió un error:' + error?.message;
      }
    );
  }

  async getReportData() {}
}