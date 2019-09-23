import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CalculatorICP';
  ischeck = false;
  elementsArray = [];
  equation = '';
  number = '';
  clear();
  clear() {
    this.equation = '';
    this.number = '';
    this.elementsArray = [];
  }

  clearNumber() {
    this.number = '';
    return '';
  }

  equationAdd(a, b) {
    this.elementsArray.push(a);
    this.elementsArray.push(b);
    this.equation += a;
    this.equation += b;
  }

  multiply(a, b) {
    let c = +this.elementsArray[a] * +this.elementsArray[b];
    this.elementsArray[a] = c.toString();
    this.elementsArray.splice(a + 1, 2);
  }

  divide(a, b) {
    let c = +this.elementsArray[a] / +this.elementsArray[b];
    this.elementsArray[a] = c.toString();
    this.elementsArray.splice(a + 1, 2);
  }

  modulo(a, b) {
    let c = +this.elementsArray[a] % +this.elementsArray[b];
    this.elementsArray[a] = c.toString();
    this.elementsArray.splice(a + 1, 2);
  }

  add(a, b) {
    let c = +this.elementsArray[a] + +this.elementsArray[b];
    this.elementsArray[a] = c.toString();
    this.elementsArray.splice(a + 1, 2);
  }

  substract(a, b) {
    let c = +this.elementsArray[a] - +this.elementsArray[b];
    this.elementsArray[a] = c.toString();
    this.elementsArray.splice(a + 1, 2);
  }


  calculate() {
    for (let i = 0; i < this.elementsArray.length; i++) {
      if (this.elementsArray[i] === '*') {
        this.multiply(i - 1, i + 1);
        i = i - 2;
      } else if (this.elementsArray[i] === '/') {
        this.divide(i - 1, i + 1);
        i = i - 2;
      } else if (this.elementsArray[i] === '%') {
        this.modulo(i - 1, i + 1);
        i = i - 2;
      }
    }
    for (let i = 0; i < this.elementsArray.length; i++) {
      if (this.elementsArray[i] === '+') {
        this.add(i - 1, i + 1);
        i = i - 2;
      } else if (this.elementsArray[i] === '-') {
        this.substract(i - 1, i + 1);
        i = i - 2;
      }
    }
  }
  butcick(str) {
    console.log('check');
    if(this.ischeck){
      this.clear();
    }
    this.ischeck = false;
    switch (str) {
      case '+':
      {
        this.equationAdd(this.number, '+');
        this.clearNumber();
        break;
      }
      case '-':
      {
        this.equationAdd(this.number, '-');
        this.clearNumber();
        break;
      }

      case '*':
      {
        this.equationAdd(this.number, '*');
        this.clearNumber();
        break;
      }
      case '/':
      {
        this.equationAdd(this.number, '/');
        this.clearNumber();
        break;
      }

      case '%':
      {
        this.equationAdd(this.number, '%');
        this.clearNumber();
        break;
      }
      case 'Clear':
      {
        this.clear();
        break;

      }

      case '=':
      {
        this.ischeck = true;
        this.equationAdd(this.number, '=');
        this.elementsArray.pop();
        this.calculate();
        this.number = this.elementsArray[0];
        this.equation = '';
        this.elementsArray.pop();
        break;
      }

      default:
      {
        this.number += str;
        break;
      }

    }
  }
}
