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
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function Home() {
  const categories = [
    { name: 'DOGS', color: 'bg-[#A7C9A7]', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600' },
    { name: 'CATS', color: 'bg-[#FFB2C9]', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600' },
    { name: 'BIRDS', color: 'bg-[#A7C9A7]', image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&q=80&w=600' },
    { name: 'TURTLES', color: 'bg-[#FFB2C9]', image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&q=80&w=600' },
    { name: 'RABBITS', color: 'bg-[#A7C9A7]', image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=600' },
  ];

  const featuredPros = [
    {
      id: 1,
      name: 'Amine El Amrani',
      role: 'Pet Sitter Certifié',
      city: 'Casablanca',
      rating: 4.9,
      reviews: 38,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 2,
      name: 'Sarah Benali',
      role: 'Garde & Soins Animaux',
      city: 'Rabat',
      rating: 5.0,
      reviews: 52,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 3,
      name: 'Youssef Mansouri',
      role: 'Promeneur & Soigneur',
      city: 'Marrakech',
      rating: 4.8,
      reviews: 29,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F9F7] text-[#0D3B36] font-sans">
      
      <header className="bg-[#0D3B36] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <Link to="/" className="text-2xl font-black tracking-tight flex items-center gap-2">
              <span className="text-[#FFB2C9]">•</span> PetCare <span className="text-[#FFB2C9]">•</span>
            </Link>
            <span className="hidden lg:inline text-xs italic text-emerald-200 border-l border-emerald-800 pl-3">
              Worry-Free Pet Parenting.
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-emerald-100">
            <a href="#about" className="hover:text-[#FFB2C9] transition-colors">About us</a>
            <a href="#services" className="hover:text-[#FFB2C9] transition-colors">Services</a>
            <a href="#pros" className="hover:text-[#FFB2C9] transition-colors">Happy Clients</a>
            <a href="#why" className="hover:text-[#FFB2C9] transition-colors">Why us</a>
            <a href="#contact" className="hover:text-[#FFB2C9] transition-colors">Contacts</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              to="/login" 
              className="text-sm font-bold text-emerald-100 hover:text-white px-4 py-2 transition-colors"
            >
              Connexion
            </Link>
            <Link 
              to="/register" 
              className="bg-[#FFB2C9] hover:bg-[#ff9eb9] text-[#0D3B36] font-black text-sm px-6 py-2.5 rounded-full transition-all shadow-md transform hover:scale-105"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </header>

      <section className="relative py-16 lg:py-24 max-w-7xl mx-auto px-6 overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-100/60 text-[#0D3B36] px-4 py-1.5 rounded-full text-sm font-bold">
              <Heart className="w-4 h-4 text-[#FFB2C9] fill-[#FFB2C9]" />
              from <span className="text-xl font-black text-[#88B04B]">150 DH</span> / heure
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-none text-[#0D3B36]">
              big <span className="text-[#FFB2C9]">hearts</span> for <br />
              little <span className="text-[#88B04B]">paws..</span>
            </h1>

            <p className="text-lg text-slate-600 font-medium max-w-md mx-auto lg:mx-0">
              We treat your furry family members exactly like our own. Professional & loving care for your pets.
            </p>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
              <Link 
                to="/register" 
                className="bg-[#0D3B36] hover:bg-[#15534c] text-white font-bold px-8 py-4 rounded-full transition-all flex items-center gap-3 shadow-xl transform hover:-translate-y-0.5"
              >
                Réserver un sitter <ArrowRight className="w-5 h-5 text-[#FFB2C9]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center gap-6">
            <div className="w-48 sm:w-60 h-80 sm:h-[420px] rounded-t-full bg-[#A7C9A7] overflow-hidden shadow-2xl border-4 border-white mt-8 transform -rotate-2 hover:rotate-0 transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600" 
                alt="Pet Care Dogs" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-48 sm:w-60 h-80 sm:h-[420px] rounded-t-full bg-[#FFB2C9] overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=600" 
                alt="Cute Dog" 
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
              <div className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full bg-[#EAF2EA] flex items-center justify-center p-4 shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&q=80&w=700" 
                  alt="Girl playing with cat" 
                  className="w-full h-full rounded-full object-cover shadow-2xl border-8 border-white"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-4xl sm:text-5xl font-black text-[#0D3B36] leading-tight">
                trusted <span className="text-[#FFB2C9]">hands</span> for <br />
                precious <span className="text-[#88B04B]">paws</span>
              </h2>

              <p className="text-xl font-bold text-[#0D3B36]">
                Caring for every paw, big or small.
              </p>

              <p className="text-slate-600 leading-relaxed font-normal">
                We are a small company providing professional, yet affordable at-home pet sitting services. Our philosophy has always been simple: we love what we do and really care about your pets.
              </p>

              <p className="text-slate-600 leading-relaxed font-normal">
                Our passionate pet sitters are proud to offer a full range of services when you are out or in lack of time.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 font-bold text-sm text-[#0D3B36]">
                <div className="flex items-center gap-2 bg-[#F7F9F7] px-4 py-2 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-[#88B04B]" /> Sitters Vérifiés
                </div>
                <div className="flex items-center gap-2 bg-[#F7F9F7] px-4 py-2 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-[#88B04B]" /> Suivi en direct
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-[#F7F9F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D3B36]">Nos Catégories D'Animaux</h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">Nous prenons soin de tous vos compagnons préférés</p>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-none justify-start lg:justify-center">
            {categories.map((cat, idx) => (
              <div key={idx} className="shrink-0 flex flex-col items-center group cursor-pointer">
                <div className={`w-40 h-48 sm:w-48 sm:h-56 ${cat.color} rounded-3xl p-3 shadow-md overflow-hidden flex items-center justify-center transform group-hover:-translate-y-2 transition-all duration-300`}>
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <span className="mt-4 font-black text-sm tracking-widest text-[#0D3B36] group-hover:text-[#88B04B] transition-colors">
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
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600" 
                  alt="Golden Retriever" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
              
              <div className="bg-[#124842] p-8 rounded-3xl border border-emerald-800 space-y-4 shadow-lg hover:border-[#FFB2C9] transition-all">
                <HomeIcon className="w-10 h-10 text-[#A7C9A7]" />
                <h3 className="text-2xl font-bold">Peace of Mind</h3>
                <p className="text-emerald-100/80 text-sm leading-relaxed">
                  Knowing your pet is safe, comfortable, and loved in their familiar environment while you're away.
                </p>
                <span className="inline-block text-xs font-bold text-[#FFB2C9]">/ 01 /</span>
              </div>

              <div className="bg-[#124842] p-8 rounded-3xl border border-emerald-800 space-y-4 shadow-lg hover:border-[#A7C9A7] transition-all">
                <Smile className="w-10 h-10 text-[#FFB2C9]" />
                <h3 className="text-2xl font-bold">Personalized Attention</h3>
                <p className="text-emerald-100/80 text-sm leading-relaxed">
                  Each pet receives care tailored specifically to their personality, routine, and medical needs.
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
          <p className="text-slate-600 mt-2 font-medium">Réservez les meilleurs professionnels certifiés pour votre animal.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPros.map((pro) => (
            <div key={pro.id} className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={pro.image} 
                  alt={pro.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#FFB2C9] shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-lg text-[#0D3B36]">{pro.name}</h3>
                  <p className="text-xs font-bold text-[#88B04B]">{pro.role}</p>
                  <p className="text-xs text-slate-400 mt-0.5"> {pro.city}</p>
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
                <p className="text-sm text-emerald-200">contact@PetCare.ma</p>
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
            © {new Date().getFullYear()} PetCare. All Rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}