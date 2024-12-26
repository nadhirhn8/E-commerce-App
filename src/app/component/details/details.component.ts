import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  id:any
  item:any={}

  constructor(private api : ApiService , private route:ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get("id")
  }

  ngOnInit(): void {
    this.getListProduitById();
  }

  getListProduitById() {
    this.api.getProduitById(this.id).subscribe((data: any) => {
      this.item = data;
    });
}
}
