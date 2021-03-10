import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ordersService} from './orders.service';
// import {ModalComponentComponent} from '../modal-component/modal-component.component'
// import * as JQuery from 'jquery';

declare var jQuery:any;



@Component({
  selector: 'app-orders',
  templateUrl: 'orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @ViewChild('Modal') myModal!:ElementRef;
  columnDefs = 
  [
    { 
      field: 'OrderID',
      headerName:' Order ID',
      sortable: true,
      filter: true
    },
    {
      field: 'orderedProducts',
      headerName:'Ordered Products',
    },
    {
      field: 'orderDate',
      headerName:'Order Date',
      sortable: true,
      filter:true
    },
    {
      field: 'orderBy',
      headerName:'Order By',
      sortable: true,
      filter:true
    }
  ];
  public userId = localStorage.getItem("userID");
  rowData:any;

  constructor(
    public ordersService: ordersService,
    
    // public modal: ModalComponentComponent
  ) {

  }

  
  ngOnInit() {
    this.getUserOrdersData()
  }

  getUserOrdersData () {
    this.ordersService.getUserOrders(this.userId).subscribe (
      res => {
        if(res.length > 0) {
          this.rowData = res;
        }   
      },
      error => {
    })
  }
  placeOrder () {
    jQuery('#myModal').show();
  }

}
