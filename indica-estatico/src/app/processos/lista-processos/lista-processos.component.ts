import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/autenticacao/token.service';
import { ProcessoService } from '../processos.service';
import { Indicacao, Processo, ProcessoRequest, ProcessoResponse } from '../../entities/processos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-processos',
  templateUrl: './lista-processos.component.html',
  styleUrls: ['./lista-processos.component.css']
})

export class ListaProcessosComponent implements OnInit {
  podeIncluir = false; 
  podeIndicar = false;
  listaProcessos!: Processo[];
  exibeLista = true;
  exibeDetalhar = false;
  exibeIndicar = false;
  exibeIncluir = false;
  detalhe!: Processo;
// Input do processo
  inputEmpresa = '';
  inputVaga = '';
  inputValor = 0;
// Input da indicação
  novaIndicacaoForm!: FormGroup;

  inputIndicante = '';

  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private processoService: ProcessoService,
    ) { }

    ngOnInit(): void {
      this.listaProcessos = [];
      this.novaIndicacaoForm = this.formBuilder.group({
        linkedin: [''],
        nome: ['', [Validators.required, Validators.minLength(4)]],
        telefone: ['', [Validators.required , Validators.minLength(10) , Validators.maxLength(11)]],
      })
      switch (this.tokenService.retornaToken('perfil')) {
        case 'adm':
          this.podeIncluir = true;
          break;
        case 'indicante':
          this.podeIndicar = true;
          break;
        default: break;
      }
      this.inputIndicante = this.tokenService.retornaToken('name');
      this.consultarProcessos();
    }

    aceitarIndicacao(processo: number, indicacao: number) {
      if (window.confirm("Deseja aceitar o candidato indicado?")) {
        this.listaProcessos[processo].indicacoes[indicacao].aceita = true;
        this.detalhaProcesso(this.listaProcessos[processo].id);
      }
    }

    pushProcesso(item: ProcessoResponse, index: number): void {
      const processo : Processo = { 
        id: item.id,
        indice: index,
        empresa: item.Empresa,
        vaga: item.Vaga,
        aberto: item.Status === "Em andamento" ? true : false,
        valor: item.ValorPremiacao,
        indicacoes: []           
      };
      // console.log('processo adicionado na lista: ', processo);
      this.listaProcessos.push(processo); 
    }

    consultarProcessos() :void {
      this.processoService.listarProcessos().subscribe((response) => {
        // console.log('recuperados os processos ', response);
        response.forEach((item, index) => {
          this.pushProcesso(item, index);
        });
      }) ;
    }

    detalhaProcesso(id: number|undefined) {
      if (id) {
        this.montarDetalhamento(id);
        this.toggleDetalhar();
      }
    }

    encerraProcesso(id: number|undefined) :void{
      if (window.confirm("Deseja encerrar o processo?")) {
        this.listaProcessos.forEach((processo) => {
          if (processo.id === id) {
            this.processoService.atualizarStatusProcesso(id, "Encerrado").subscribe((response) => {
              window.alert(`Processo encerrado em ${response.updatedAt}`);
            })
            processo.aberto = false;
            let aux: Array<any> = [];
            processo.indicacoes.forEach((item) => {
              if (item.aceita) {
                const indice = aux
                .map((x) => x.nome)
                .indexOf(item.indicante)
                if (indice === -1) {
                  aux.push({nome: item.indicante, quantidade: 1});
                } else {
                  aux[indice].quantidade = aux[indice].quantidade + 1
                }
              }
            })
          if (this.exibeDetalhar) {
            this.toggleDetalhar();
          }
        }
        });
      }
    }

    incluirIndicacao(id: number|undefined) {
      const novaIndicacao = this.novaIndicacaoForm.getRawValue();
      this.listaProcessos.forEach((processo) => {
        if (processo.id === id) {
          const auxLinkedin = (novaIndicacao.linkedin === '' || novaIndicacao.linkedin === null) ? '' : `https://www.linkedin.com/in/${novaIndicacao.linkedin}`;
          const indicacao:Indicacao = {
            aceita: false,
            indicante: this.inputIndicante,
            linkedin: auxLinkedin,
            nomeIndicado: novaIndicacao.nome,
            telefoneIndicado: novaIndicacao.telefone,
            sequencial: processo.indicacoes.length
          }
          processo.indicacoes.push(indicacao);
          this.novaIndicacaoForm.reset();
          this.toggleIndicar();
        }
      })
    }

    incluirProcesso() {
      const req: ProcessoRequest = {
        Empresa: this.inputEmpresa,
        Vaga: this.inputVaga,
        MatriculaRH: this.inputIndicante.toUpperCase(),
        Status: "Em andamento",
        ValorPremiacao: this.inputValor    
      };
      this.processoService.incluirProcesso(req).subscribe((response) => {
        this.pushProcesso(response, this.listaProcessos.length);
      });
      this.inputEmpresa = '';
      this.inputVaga = '';
      this.toggleIncluir();    
    }

    montarIndicacao(id: number|undefined) {
      if (id) {
        this.montarDetalhamento(id);
        this.toggleIndicar();
      }
    }

    montarDetalhamento(id: number) {
      this.listaProcessos.forEach((processo) => {
        if (processo.id === id) {
          this.detalhe = processo;
        }
      })
    }

    toggleDetalhar() {
      this.exibeDetalhar = !this.exibeDetalhar;
      this.toggleListar();
    }

    toggleIndicar() {
      this.exibeIndicar = !this.exibeIndicar;
      if (this.exibeDetalhar) {
        this.toggleDetalhar();
      }
      this.toggleListar();
    }

    toggleIncluir() {
      this.exibeIncluir = !this.exibeIncluir;
      this.toggleListar();
    }

    toggleListar() {
      this.exibeLista = !this.exibeLista;
    }

}
