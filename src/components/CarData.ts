import ToyotaCamry from '../images/cars/toyota-camry-hybrid.webp';
import ToyotaHilux from '../images/cars/toyota-hilux.webp';
import BmwX4 from '../images/cars/bmw-x4.webp';
import BmwX5 from '../images/cars/bmw-x5.webp';
import ChevroletOnix from '../images/cars/chevrolet-onix.webp';
import ChevroletSpin from '../images/cars/chevrolet-spin.webp';
import FiatMobi from '../images/cars/fiat-mobi.webp';
import FiatUno from '../images/cars/fiat-uno.webp';
import VolkswagenGolf from '../images/cars/volkswagen-golf.webp';
import VolkswagenBeetle from '../images/cars/volkswagen-new-beetle.webp';

interface Car {
  name: string;
  price: string;
  img: string;
  model: string;
  mark: string;
  year: string;
  doors: string;
  air: string;
  transmission: string;
  fuel: string;
}

export const CAR_DATA: Car[][] = [
  [
    {
      name: 'Toyota Camry Hybrid',
      price: '130',
      img: ToyotaCamry,
      model: 'Camry Hybrid',
      mark: 'Toyota',
      year: '2020',
      doors: '4',
      air: 'Yes',
      transmission: 'Automatic',
      fuel: 'Hybrid',
    },
  ],
  [
    {
      name: 'Toyota Hilux',
      price: '180',
      img: ToyotaHilux,
      model: 'Hilux',
      mark: 'Toyota',
      year: '2021',
      doors: '4',
      air: 'Yes',
      transmission: 'Manual',
      fuel: 'Gasoline',
    },
  ],
  [
    {
      name: 'BMW X4 M40i',
      price: '220',
      img: BmwX4,
      model: 'X4',
      mark: 'BMW',
      year: '2019',
      doors: '4',
      air: 'Yes',
      transmission: 'Automatic',
      fuel: 'Flex',
    },
  ],
  [
    {
      name: 'BMW X5 Convertible',
      price: '250',
      img: BmwX5,
      model: 'X5',
      mark: 'BMW',
      year: '2020',
      doors: '2',
      air: 'Yes',
      transmission: 'Automatic',
      fuel: 'Flex',
    },
  ],
  [
    {
      name: 'Chevrolet Onix',
      price: '140',
      img: ChevroletOnix,
      model: 'Onix',
      mark: 'Chevrolet',
      year: '2019',
      doors: '4',
      air: 'Yes',
      transmission: 'Automatic',
      fuel: 'Flex',
    },
  ],
  [
    {
      name: 'Chevrolet Spin',
      price: '140',
      img: ChevroletSpin,
      model: 'Spin',
      mark: 'Chevrolet',
      year: '2019',
      doors: '4',
      air: 'Yes',
      transmission: 'Manual',
      fuel: 'Gasoline',
    },
  ],
  [
    {
      name: 'Fiat Mobi',
      price: '110',
      img: FiatMobi,
      model: 'Mobi',
      mark: 'Fiat',
      year: '2022',
      doors: '4',
      air: 'Yes',
      transmission: 'Manual',
      fuel: 'Gasoline',
    },
  ],
  [
    {
      name: 'Fiat Uno',
      price: '100',
      img: FiatUno,
      model: 'Uno',
      mark: 'Fiat',
      year: '2022',
      doors: '4',
      air: 'Yes',
      transmission: 'Manual',
      fuel: 'Gasoline',
    },
  ],
  [
    {
      name: 'Volkswagen Golf',
      price: '150',
      img: VolkswagenGolf,
      model: 'Golf',
      mark: 'Volkswagen',
      year: '2020',
      doors: '4',
      air: 'Yes',
      transmission: 'Manual',
      fuel: 'Gasoline',
    },
  ],
  [
    {
      name: 'Volkswagen New Beetle',
      price: '160',
      img: VolkswagenBeetle,
      model: 'New Beetle',
      mark: 'Volkswagen',
      year: '2021',
      doors: '2',
      air: 'Yes',
      transmission: 'Automatic',
      fuel: 'Flex',
    },
  ],
];
