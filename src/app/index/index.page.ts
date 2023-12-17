import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  currentContent: string = 'default';
  planosData: any[] = [];
  logsData: any[] = [];
  funcionariosData: any[] = [];
  alunosData: any[] = [];
  alunoSelecionado: any;
  funcionarioSelecionado: any;

  constructor(private navCtrl: NavController ,private menuController: MenuController, private http: HttpClient, public alertController: AlertController) { }

  ngOnInit() {
    this.fetchPlanosData();
    this.fetchLogsData();
    this.fetchFuncionariosData();
    this.fetchAlunosData(); 
    this.ionViewDidEnter();

  }

  showContent(contentType: string) {
    this.currentContent = contentType;
  }

  closeMenu() {
    this.menuController.close();
  }

  fetchFuncionariosData() {
    const storedUsername = sessionStorage.getItem('username');
    const apiUrl = 'https://www.#######.com.br/academia/API/buscar_dados_funcionarios.php?db=' + storedUsername;

    this.http.get<any[]>(apiUrl).subscribe((data) => {
      this.funcionariosData = data;
    });
  }


  fetchPlanosData() {
    const storedUsername = sessionStorage.getItem('username');
    const apiUrl = 'https://www.#######.com.br/academia/API/buscar_dados_planos.php?db=' + storedUsername;

    this.http.get<any[]>(apiUrl).subscribe((data) => {
      this.planosData = data;
    });
  }

  fetchLogsData() {
    const storedUsername = sessionStorage.getItem('username');
    const apiUrl = 'https://www.#######.com.br/academia/API/buscar_dados_entradas.php?db=' + storedUsername ;

    this.http.get<any[]>(apiUrl).subscribe((data) => {
      this.logsData = data;
    });
  }

  fetchAlunosData() {
    const storedUsername = sessionStorage.getItem('username');
    const apiUrl = 'https://www.#######.com.br/academia/API/buscar_dados_alunos.php?db=' + storedUsername;

    this.http.get<any[]>(apiUrl).subscribe((data) => {
      this.alunosData = data;
    });
  }

  logout() {
    console.log('Usuário fez logout!');
    this.navCtrl.navigateRoot('/home');
  }

  async mostrarDadosAluno(aluno: any) {
    this.alunoSelecionado = aluno;
    this.exibirAlertaAluno();
  }



  async mostrarDadosFuncionarios(funcionario: any) {
    this.funcionarioSelecionado = funcionario;
    this.exibirAlertaFuncionario();
  }


  async exibirAlertaAluno() {
    const alert = await this.alertController.create({
      header: 'Detalhes do Aluno',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Alerta fechado');
          },
        },
      ],
      inputs: [
        {
            value: 'CPF: ' + this.alunoSelecionado.cpf,
            disabled: true,
            cssClass: 'alert-label',
        },
        {
            value: 'Email: ' + this.alunoSelecionado.email,
            disabled: true,
            cssClass: 'alert-label',
        },
        {
            value: 'Telefone: ' + this.alunoSelecionado.telefone,
            disabled: true,
            cssClass: 'alert-label',
        },
        {
            value: 'Endereço: ' + this.alunoSelecionado.endereco,
            disabled: true,
            cssClass: 'alert-label',
        },
        {
            value: 'Cidade: ' + this.alunoSelecionado.cidade,
            disabled: true,
            cssClass: 'alert-label',
        },
    ],
    
    });
  
    await alert.present();
  }
  
  
  
  formatarMensagemAluno() {
    return `
      Detalhes do Aluno:
      
      CPF: ${this.alunoSelecionado.cpf}
      Email: ${this.alunoSelecionado.email}
      Telefone: ${this.alunoSelecionado.telefone}
      Endereço: ${this.alunoSelecionado.endereco}
      Cidade: ${this.alunoSelecionado.cidade}
    `;
  }
  
  
  ionViewDidEnter() {
    const storedUsername = sessionStorage.getItem('username');
    console.log('Nome de usuário armazenado:', storedUsername);
  }

    
  formatarMensagemFuncionario() {
    return `
      Nome: ${this.funcionarioSelecionado.nome}
      Cargo: ${this.funcionarioSelecionado.cargo}
      Salário: ${this.funcionarioSelecionado.salario}
      Admissão: ${this.funcionarioSelecionado.admissao}
      Departamento: ${this.funcionarioSelecionado.departamento}
      Endereço: ${this.funcionarioSelecionado.endereco}
      Telefone: ${this.funcionarioSelecionado.telefone}
      Email: ${this.funcionarioSelecionado.email}
      Nascimento: ${this.funcionarioSelecionado.nascimento}
      CPF: ${this.funcionarioSelecionado.cpf}
    `;
  }

  
  async exibirAlertaFuncionario() {
    const alert = await this.alertController.create({
      header: 'Detalhes do Funcionário',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Alerta fechado');
          },
        },
      ],
      inputs: [
        {
          value: 'Nome: ' + this.funcionarioSelecionado.nome,
          disabled: true,
          cssClass: 'alert-label',
        },
        {
          value: 'Cargo: ' + this.funcionarioSelecionado.cargo,
          disabled: true,
          cssClass: 'alert-label',
        },
        {
          value: 'Salário: ' + this.funcionarioSelecionado.salario,
          disabled: true,
          cssClass: 'alert-label',
        },
        {
          value: 'Admissão: ' + this.funcionarioSelecionado.admissao,
          disabled: true,
          cssClass: 'alert-label',
        },
        {
          value: 'Departamento: ' + this.funcionarioSelecionado.departamento,
          disabled: true,
          cssClass: 'alert-label',
        },
        {
          value: 'Endereço: ' + this.funcionarioSelecionado.endereco,
          disabled: true,
          cssClass: 'alert-label',
        },
        {
          value: 'Telefone: ' + this.funcionarioSelecionado.telefone,
          disabled: true,
          cssClass: 'alert-label',
        },
        {
          value: 'Email: ' + this.funcionarioSelecionado.email,
          disabled: true,
          cssClass: 'alert-label',
        },
        {
          value: 'Nascimento: ' + this.funcionarioSelecionado.nascimento,
          disabled: true,
          cssClass: 'alert-label',
        },
        {
          value: 'CPF: ' + this.funcionarioSelecionado.cpf,
          disabled: true,
          cssClass: 'alert-label',
        },
      ],
    });
  
    await alert.present();
  }
  
  
  
}
