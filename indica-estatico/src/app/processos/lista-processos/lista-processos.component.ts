import { Component, OnInit , LOCALE_ID, Inject } from '@angular/core';
import { TokenService } from 'src/app/autenticacao/token.service';
import { ProcessoService } from '../processos.service';
import { Indicacao, Processo, ProcessoRequest, ProcessoResponse } from '../../entities/processos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndicacaoRequest } from 'src/app/entities/indicacoes';

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

  todasIndicacoesAceitas: boolean = true;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
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
      this.listarProcessos();
    }

    aceitarIndicacao(processo: number, indicacao: number) {
      if (window.confirm("Deseja aceitar o candidato indicado?")) {
        this.processoService.atualizarStatusIndicacao(indicacao, "Aceita").subscribe((response) => {
          window.alert(`Indicação aceita em ${response.updatedAt}`);
        });
        this.detalharProcesso(processo);
      }
    }

    detalharProcesso(id: number) {
      if (id) {
        this.montarDetalhamento(id);
        this.toggleDetalhar();
      }
    }

    encerrarProcesso(pid: number) :void{
      if (window.confirm(`Deseja encerrar o processo ${pid}?`)) {
        this.processoService.atualizarStatusProcesso(pid, "Encerrado").subscribe((processo) => {
          const mensagem:string = `Processo ${pid} encerrado em ${processo.updatedAt}`;  
          window.alert(mensagem);
          console.log(mensagem);
          this.listaProcessos.forEach((item) => {
            item.indicacoes.forEach((indicacao) => {
              if (indicacao.aceita) {
                const req = {
                  "ValorPremiacao": item.valor,
                  "IdIndicacao": indicacao.id,
                  "IdProcesso": item.id              
                };
                this.processoService.incluirPremiacao(req).subscribe((premio) => {
                  console.log(`Premiação ${premio.id} criada em ${premio.createdAt}`);
                })
              }  
            });
          });
        });
      }
      if (this.exibeDetalhar) {
        this.toggleDetalhar();
      }
    }

    incluirIndicacao(id: number|undefined) {
      const novaIndicacao = this.novaIndicacaoForm.getRawValue();
      this.listaProcessos.forEach((processo) => {
        if (processo.id === id) {
          const auxLinkedin = (novaIndicacao.linkedin === '' || novaIndicacao.linkedin === null) ? '' : `https://www.linkedin.com/in/${novaIndicacao.linkedin}`;
          const req:IndicacaoRequest = {
            IdProcesso: id,
            NomeIndicado: novaIndicacao.nome,
            TelefoneIndicado: novaIndicacao.telefone,
            MatriculaIndicante: this.inputIndicante.toUpperCase(),
            Status: "Incluída",
            Linkedin: auxLinkedin,     
          }
          this.processoService.incluirIndicacao(req).subscribe((response) => {
            const indicacao:Indicacao = {
              id: response.id,
              aceita: false,
              indicante: response.MatriculaIndicante,
              linkedin: response.Linkedin,
              nomeIndicado: response.NomeIndicado,
              telefoneIndicado: response.TelefoneIndicado      
            }
            processo.indicacoes.push(indicacao);
          })
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

    listarIndicacoes(idProcesso: number, indiceProcesso: number) :void {
      this.todasIndicacoesAceitas = true;
      if (indiceProcesso > -1) {
        this.listaProcessos[indiceProcesso].indicacoes.length = 0;
        this.processoService.listarIndicacoes(idProcesso).subscribe((response) => {
          response.forEach((item) => {
            const indicacao: Indicacao = {
              id: item.id,
              aceita: (item.Status === "Aceita"),
              indicante: item.MatriculaIndicante,
              linkedin: item.Linkedin,
              nomeIndicado: item.NomeIndicado,
              telefoneIndicado: item.TelefoneIndicado        
            }
            if (!indicacao.aceita) {
              this.todasIndicacoesAceitas = false;
            }
            this.listaProcessos[indiceProcesso].indicacoes.push(indicacao);
          });
        }) ;
      }
    }

    listarProcessos() :void {
      this.listaProcessos.length = 0;
      this.processoService.listarProcessos().subscribe((response) => {
        response.forEach((item, index) => {
          this.pushProcesso(item, index);
        });
      }) ;
    }

    montarIndicacao(id: number) {
      if (id) {
        this.montarDetalhamento(id);
        this.toggleIndicar();
      }
    }

    montarDetalhamento(id: number) {
      this.listaProcessos.forEach((processo, index) => {
        if (processo.id === id) {
          this.listarIndicacoes(id, index);
          this.detalhe = processo;
          if (!processo.aberto) {
            this.processoService.listarPremiacoes(id).subscribe((response) => {
              const qtPremiados = response.length;
              switch(qtPremiados) {
                case 0:
                  window.alert(`Não houve premiação no processo ${id}`)
                  break;
                case 1:
                  window.alert(`Apenas 1 pessoa foi premiada no processo ${id}`)
                  break;
                default:
                  window.alert(`O processo ${id} teve ${qtPremiados} premiado(s)`)
                  break;
                }
            })
          }
        }
      })
    }

    pushProcesso(item: ProcessoResponse, index: number): void {
      const processo : Processo = { 
        id: item.id,
        indice: index,
        empresa: item.Empresa,
        vaga: item.Vaga,
        aberto: item.Status === "Em andamento" ? true : false,
        valor: item.ValorPremiacao,
        tsCriacao: item.createdAt,
        tsAtualizacao: item.updatedAt,
        indicacoes: []           
      };
      this.listaProcessos.push(processo); 
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
