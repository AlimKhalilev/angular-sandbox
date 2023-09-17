import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageRoutingModule } from './registration-page-routing.module';
import { RegistrationPageComponent } from './registration-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [RegistrationPageComponent],
    imports: [CommonModule, RegistrationPageRoutingModule, FormsModule]
})
export class RegistrationPageModule {}
