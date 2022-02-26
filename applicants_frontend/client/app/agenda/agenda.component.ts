import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { applicantService } from '../services/applicant.service';
import { Applicant } from '../shared/models/applicant';
import { ExcelService } from '../services/excel.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit  {

  displayedColumns = ['Nombre', 'Teléfono', 'Email', 'Fecha', 'Referido', 'Enlace_CV'];
  public dataSource = new MatTableDataSource<Element>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  apl: Applicant[] = [];
  ELEMENT_DATA: Element[] = [];

  constructor(private applicantService: applicantService,
     private excelService: ExcelService) { }

  ngOnInit(): void {
    this.get_interviews();
  }


  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.apl, 'Entrevistas');
  }
  

  get_interviews(): void{
    this.applicantService.get_process().subscribe(
        (res) => {
          console.log(res);

          this.dataSource = new MatTableDataSource(res);
        }
    ); 
    this.dataSource.paginator = this.paginator;
  }
  

}

export interface Element {
  nombre: string;
  telefono: number;
  email: string;
  fecha: string;
  referido: string;
  enlace_CV: string;
}