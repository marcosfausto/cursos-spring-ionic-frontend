import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.services';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let LocalUser = this.storage.getLocalUser();
    if (LocalUser && LocalUser.email) { // checar se é nulo
      this.clienteService.findByEmail(LocalUser.email)
      .subscribe(response => {
        this.items = response['enderecos']

        let cart = this.cartService.getCart();

        this.pedido = {
          cliente: {id: response['id']},
          enderecoDeEntrega: null,
          pagamento: null,
          itens : cart.items.map(item => {return {quantidade: item.quantidade, produto: {id: item.produto.id}}})
        }

      },
      error => {
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id: item.id};
    console.log(this.pedido);
  }

}
