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

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ['Nombre', 'Teléfono', 'Email', 'Fecha', 'Referido', 'Enlace_CV'];
  public dataSource = new MatTableDataSource<Element>();


  apl: Applicant[] = [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ELEMENT_DATA: Element[] = [];

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    private applicantService: applicantService,
    private excelService: ExcelService) { }

  ngOnInit(): void {
    this.getInterviews();
  }


  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.apl, 'Entrevistas');
  }

  getInterviews(): void{
    this.applicantService.getProcess().subscribe(
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
  enlaceCV: string;
}
