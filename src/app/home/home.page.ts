import { Component , ElementRef, Renderer2  } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private alertController: AlertController ,private renderer: Renderer2, private el: ElementRef) {}

  loginFormSubmit() {
    // Envia os dados para a API
    const apiUrl = 'https://www.cavalopretosistemas.com.br/academia/API/dados_login.php';
    const userParam = encodeURIComponent(this.username);
    const senhaParam = encodeURIComponent(this.password);
    const apiEndpoint = `${apiUrl}?user=${userParam}&senha=${senhaParam}`;
  
    fetch(apiEndpoint)
      .then(response => response.text()) // Alterado para response.text()
      .then(data => {
        if (data === 'Sem Databases') {
          // Resposta da API indica credenciais inválidas
          this.exibirAlerta('Credenciais inválidas', 'Por favor, insira as credenciais corretas.');
        } else {
          // Credenciais válidas, armazena o nome de usuário na sessionStorage
          sessionStorage.setItem('username', data);
          this.navCtrl.navigateRoot('/index');
        }
      })
      .catch(error => {
        console.error('Erro ao chamar a API:', error);
        // Trate o erro conforme necessário
      });
  }
  
  async exibirAlerta(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }

  removeScrollClass() {
    const element = this.el.nativeElement;
    this.renderer.removeClass(element, 'scroll-y');
  }
}