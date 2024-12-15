import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage {
  scannedValue: string = '';
  isScanning: boolean = false;

  constructor(private platform: Platform) {}

  async startScan() {
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (status.granted) {
      this.isScanning = true;
      // AÃ±adimos la clase al body para ocultar el contenido mientras se escanea
      document.body.classList.add('barcode-scanner-active');
  
      const result = await BarcodeScanner.startScan();
  
      if (result.hasContent) {
        this.scannedValue = result.content;
        console.log('Valor escaneado:', this.scannedValue);
      }
  
      this.stopScan();
    } else {
      BarcodeScanner.openAppSettings();
    }
  }
  
  stopScan() {
    BarcodeScanner.stopScan();
    this.isScanning = false;
    // Quitamos la clase del body para restaurar el contenido
    document.body.classList.remove('barcode-scanner-active');
  }

  clearScannedValue() {
    this.scannedValue = '';
  }
}