import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModaService } from '../../services/moda-service';

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal implements OnInit {
  @Input() ModalType: string | undefined;
  showModal: boolean | undefined = false;

  ProductsForm: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private modalService: ModaService
  ) {}

  ngOnInit(): void {
    this.modalService.modalState$.subscribe(data => {
      this.ModalType = data?.ModalType
      this.showModal = data?.show;
      switch (this.ModalType) {
      case "product":
          this.ProductsForm = this.fb.group({
          category: ['', Validators.required],
          Name: ['', [Validators.required]],
          quty: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
          suppl: ['', [Validators.required]],
          price: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        });
      break;
    
      default:
        break;
    }
    })
  }
  submitForm() {
    switch (this.ModalType) {
      case "product":
        if (this.ProductsForm?.valid) {
          this.modalService.updateData(this.ProductsForm.value);
          this.close();
        }
      break;
    
      default:
        break;
    }
  }

  close() {
    this.showModal = false;
    this.ProductsForm = undefined;
  }
}
