import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Home as HomeIcon, 
  Smile, 
  Phone, 
  Mail, 
  MapPin 
} from 'lucide-react';

export default function Home() {
  const categories = [
    { name: 'DOGS', color: 'bg-[#A7C9A7]', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300' },
    { name: 'CATS', color: 'bg-[#FFB2C9]', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300' },
    { name: 'BIRDS', color: 'bg-[#A7C9A7]', image: 'https://images.unsplash.com/photo-1522858547137-f1dcec554f55?auto=format&fit=crop&q=80&w=300' },
    { name: 'TURTLES', color: 'bg-[#FFB2C9]', image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&q=80&w=300' },
    { name: 'RABBITS', color: 'bg-[#A7C9A7]', image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=300' },
  ];

  const featuredPros = [
    {
      id: 1,
      name: 'Amine El Amrani',
      role: 'Pet Sitter Certifié',
      city: 'Casablanca',
      rating: 4.9,
      reviews: 38,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250'
    },
    {
      id: 2,
      name: 'Sarah Benali',
      role: 'Garde & Soins Animaux',
      city: 'Rabat',
      rating: 5.0,
      reviews: 52,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
    },
    {
      id: 3,
      name: 'Youssef Mansouri',
      role: 'Promeneur & Soigneur',
      city: 'Marrakech',
      rating: 4.8,
      reviews: 29,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F9F7] text-[#0D3B36] font-sans">
      
      <header className="bg-[#0D3B36] text-white">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <Link to="/" className="text-2xl font-black tracking-tight flex items-center gap-2">
              <span className="text-[#FFB2C9]">-</span> BestPet <span className="text-[#FFB2C9]">-</span>
            </Link>
            <span className="hidden lg:inline text-xs italic text-emerald-200 border-l border-emerald-800 pl-3">
              Worry-Free Pet Parenting.
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-emerald-200">
            <svg className="w-4 h-4 cursor-pointer hover:text-white transition-colors fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            
            <svg className="w-4 h-4 cursor-pointer hover:text-white transition-colors fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-emerald-100">
            <a href="#about" className="hover:text-white transition-colors">About us</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#pros" className="hover:text-white transition-colors">Happy Clients</a>
            <a href="#why" className="hover:text-white transition-colors">Why us</a>
            <a href="#contact" className="hover:text-white transition-colors">Contacts</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              to="/login" 
              className="text-sm font-semibold text-emerald-100 hover:text-white px-3 py-2 transition-colors"
            >
              Connexion
            </Link>
            <Link 
              to="/register" 
              className="bg-[#FFB2C9] hover:bg-[#ff9eb9] text-[#0D3B36] font-bold text-sm px-5 py-2.5 rounded-full transition-all shadow-md"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </header>

      <section className="relative py-16 lg:py-24 max-w-7xl mx-auto px-6 overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block text-sm font-semibold text-[#0D3B36]">
              from <span className="text-2xl font-black text-[#88B04B]">$15</span> / per hour
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-none text-[#0D3B36]">
              big <span className="text-[#FFB2C9]">hearts</span> for <br />
              little <span className="text-[#88B04B]">paws..</span>
            </h1>

            <p className="text-lg text-slate-600 font-medium max-w-md">
              We treat your furry family members exactly like our own.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Link 
                to="/register" 
                className="bg-[#0D3B36] hover:bg-[#15534c] text-white font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2 shadow-lg"
              >
                Réserver un sitter <ArrowRight className="w-5 h-5 text-[#FFB2C9]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center gap-6">
            <div className="w-48 sm:w-60 h-80 sm:h-96 rounded-t-full bg-[#A7C9A7] overflow-hidden shadow-xl border-4 border-white mt-8">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" 
                alt="Pet Sitter" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-48 sm:w-60 h-80 sm:h-96 rounded-t-full bg-[#FFB2C9] overflow-hidden shadow-xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400" 
                alt="Happy Dog" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      <section id="about" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#EAF2EA] flex items-center justify-center p-4">
                <img 
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500" 
                  alt="Cat & Girl" 
                  className="w-full h-full rounded-full object-cover shadow-2xl border-4 border-white"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-4xl sm:text-5xl font-black text-[#0D3B36] leading-tight">
                trusted <span className="text-[#FFB2C9]">hands</span> for <br />
                precious <span className="text-[#0D3B36]">paws</span>
              </h2>

              <p className="text-xl font-bold text-[#0D3B36]">
                Caring for every paw, big or small.
              </p>

              <p className="text-slate-600 leading-relaxed font-normal">
                We are a small company providing professional, yet affordable at-home pet sitting services for over 10 years. Our philosophy has always been simple: we love what we do and really care about your pets.
              </p>

              <p className="text-slate-600 leading-relaxed font-normal">
                Our passionate pet sitters are proud to offer a full range of services when you are out or in lack of time.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-[#F7F9F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-none justify-start lg:justify-center">
            {categories.map((cat, idx) => (
              <div key={idx} className="shrink-0 flex flex-col items-center">
                <div className={`w-40 h-48 sm:w-48 sm:h-56 ${cat.color} rounded-3xl p-3 shadow-md overflow-hidden flex items-center justify-center`}>
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <span className="mt-4 font-black text-sm tracking-widest text-[#0D3B36]">
                  • {cat.name} •
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="py-24 bg-[#0D3B36] text-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl sm:text-6xl font-black">
              why do you <span className="text-[#FFB2C9]">need a sitter</span>
            </h2>
            <p className="text-emerald-100 text-lg">
              Life gets busy — and your pet deserves more than just "someone" to check in.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-64 h-96 rounded-t-full bg-[#A7C9A7] overflow-hidden border-4 border-emerald-800 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400" 
                  alt="German Shepherd" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
              
              <div className="bg-[#124842] p-8 rounded-3xl border border-emerald-800 space-y-4">
                <HomeIcon className="w-10 h-10 text-[#A7C9A7]" />
                <h3 className="text-2xl font-bold">Peace of Mind</h3>
                <p className="text-emerald-100/80 text-sm leading-relaxed">
                  Knowing your pet is safe, comfortable, and loved while you're away.
                </p>
                <span className="inline-block text-xs font-bold text-[#FFB2C9]">/ 01 /</span>
              </div>

              <div className="bg-[#124842] p-8 rounded-3xl border border-emerald-800 space-y-4">
                <Smile className="w-10 h-10 text-[#FFB2C9]" />
                <h3 className="text-2xl font-bold">Personalized Attention</h3>
                <p className="text-emerald-100/80 text-sm leading-relaxed">
                  Each pet receives care tailored to their personality and needs.
                </p>
                <span className="inline-block text-xs font-bold text-[#A7C9A7]">/ 02 /</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      <section id="pros" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-black text-[#0D3B36]">
            Nos Prestataires de <span className="text-[#FFB2C9]">Confiance</span>
          </h2>
          <p className="text-slate-600 mt-2 font-medium">Réservez les meilleurs professionnels pour votre animal.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPros.map((pro) => (
            <div key={pro.id} className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={pro.image} 
                  alt={pro.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#FFB2C9]"
                />
                <div>
                  <h3 className="font-bold text-lg text-[#0D3B36]">{pro.name}</h3>
                  <p className="text-xs font-bold text-[#88B04B]">{pro.role}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{pro.city}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span>{pro.rating}</span>
                  <span className="text-xs text-slate-400 font-normal">({pro.reviews} avis)</span>
                </div>
                <Link 
                  to="/login" 
                  className="text-xs font-bold text-[#0D3B36] hover:text-[#FFB2C9] transition-colors flex items-center gap-1"
                >
                  Voir profil <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer id="contact" className="bg-[#0D3B36] text-white pt-16 pb-8 border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex items-center gap-4">
              <Phone className="w-8 h-8 text-[#FFB2C9]" />
              <div>
                <h4 className="font-bold">Téléphone</h4>
                <p className="text-sm text-emerald-200">+212 6 00 00 00 00</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-8 h-8 text-[#A7C9A7]" />
              <div>
                <h4 className="font-bold">Email</h4>
                <p className="text-sm text-emerald-200">contact@bestpet.ma</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-8 h-8 text-[#FFB2C9]" />
              <div>
                <h4 className="font-bold">Adresse</h4>
                <p className="text-sm text-emerald-200">Casablanca, Maroc</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-emerald-800 text-xs text-emerald-300">
            © {new Date().getFullYear()} BestPet. All Rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}