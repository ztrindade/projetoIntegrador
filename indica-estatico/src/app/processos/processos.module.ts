import { NgModule , LOCALE_ID } from '@angular/core';
import { CommonModule , registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { ProcessosRoutingModule } from './processos-routing.module';
import { ListaProcessosComponent } from './lista-processos/lista-processos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MensagemModule } from '../componentes/mensagem/mensagem.module';
import { CabecalhoModule } from '../componentes/cabecalho/cabecalho.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    ListaProcessosComponent,
  ],
  imports: [
    CommonModule,
    CabecalhoModule,
    FormsModule,
    ReactiveFormsModule,
    MensagemModule,
    NgxMaskDirective, NgxMaskPipe,
    ProcessosRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    provideNgxMask()
  ]
})
export class ProcessosModule { }
