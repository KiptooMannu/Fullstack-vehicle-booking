import { BookBanner, Footer, HeroPages, Navbar, Testimonials } from '../components';

const TestimonialsPage: React.FC = () => {
  return (
    <>
    <Navbar />
    <section className='testimonial-page'>
      <HeroPages name='Testemunhas' />
      <Testimonials />
      {/* book banner */}
      <BookBanner />
      {/* footer */}
      <Footer />
    </section>
    </>
  );
};

export default TestimonialsPage;
