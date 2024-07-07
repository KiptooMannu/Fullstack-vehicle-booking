import {
  Hero,
  BookCar,
  PlanTrip,
  PickCar,
  Banner,
  ChooseUs,
  Testimonials,
  Faq,
  Download,
  Footer,
  Navbar,
} from '../components';

const Home: React.FC = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <BookCar />
      <PlanTrip />
      <PickCar />
      <Banner />
      <ChooseUs />
      <Testimonials />
      <Faq />
      <Download />
      <Footer />
    </main>
  );
};

export default Home;
