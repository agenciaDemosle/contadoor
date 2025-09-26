import { motion } from 'framer-motion';

// Import all client logos
import logo3cServices from '../../assets/Logo clientes/3c Services.jpeg';
import logoAlianza from '../../assets/Logo clientes/ALIANZA INCLUSIVA.jpeg';
import logoAurea from '../../assets/Logo clientes/Aurea Propiedades.png';
import logoBarberiaGreece from '../../assets/Logo clientes/Barberia Estudio Greece.jpg';
import logoBienestar from '../../assets/Logo clientes/Bienestar clau.png';
import logoCafeSolidario from '../../assets/Logo clientes/Cafe solidario.png';
import logoCentauri from '../../assets/Logo clientes/CENTAURI LOGISTICS.png';
import logoColder from '../../assets/Logo clientes/Colder Soluciones Termicas.png';
import logoVenecia from '../../assets/Logo clientes/Comercializadora la Venecia.png';
import logoCreesiente from '../../assets/Logo clientes/creesiente.png';
import logoCutsFactory from '../../assets/Logo clientes/Cuts Factory Barberia.jpg';
import logoDamyfar from '../../assets/Logo clientes/DAMYFAR FARMACIAS.png';
import logoDetallesChile from '../../assets/Logo clientes/detalleschile-logo.png';
import logoElecteik from '../../assets/Logo clientes/Electeik.png';
import logoFactorynet from '../../assets/Logo clientes/factorynet.webp';
import logoForPrinces from '../../assets/Logo clientes/for Princes.png';
import logoFujisport from '../../assets/Logo clientes/fujisport.png';
import logoFullgraf from '../../assets/Logo clientes/Fullgraf Servicios Publicitarios.jpeg';
import logoGoaFilms from '../../assets/Logo clientes/GOA FILMS.jpeg';
import logoGraciamar from '../../assets/Logo clientes/Graciamar.jpeg';
import logoHabitar from '../../assets/Logo clientes/Habitar.png';
import logoIndasBarberia from '../../assets/Logo clientes/Indas Barbería.webp';
import logoJMAscensores from '../../assets/Logo clientes/JM Ascensores.png';
import logoLabdom from '../../assets/Logo clientes/LABDOM.png';
import logoInhaus from '../../assets/Logo clientes/LogoInhaus-260x80.png';
import logoMalandra from '../../assets/Logo clientes/Malandra.png';
import logoMaquilladas from '../../assets/Logo clientes/Maquilladas.cl.jpg';
import logoMedicec from '../../assets/Logo clientes/MEDICEC CENTRO DE ESPECIALIDADES MEDICAS.jpeg';
import logoMyPuppi from '../../assets/Logo clientes/mypuppi.png';
import logoOparts from '../../assets/Logo clientes/Oparts.jpeg';
import logoOrion from '../../assets/Logo clientes/Orion.jpg';
// Removed Pinta Tu Edificio - appears blank
import logoPolerasAlexandra from '../../assets/Logo clientes/Poleras alexandra.png';
import logoRestWok from '../../assets/Logo clientes/Rest wok grill.jpg';
import logoRPGServicios from '../../assets/Logo clientes/RPG Servicios.png';
import logoRupu from '../../assets/Logo clientes/RUPU.png';
import logoVivaWellness from '../../assets/Logo clientes/Viva Wellness.png';
import logoZuvavit from '../../assets/Logo clientes/ZUVAVIT.jpeg';

const companies = [
  { id: 1, name: '3c Services', logo: logo3cServices },
  { id: 2, name: 'Alianza Inclusiva', logo: logoAlianza },
  { id: 3, name: 'Aurea Propiedades', logo: logoAurea },
  { id: 4, name: 'Barbería Estudio Greece', logo: logoBarberiaGreece },
  { id: 5, name: 'Bienestar Clau', logo: logoBienestar },
  { id: 6, name: 'Café Solidario', logo: logoCafeSolidario },
  { id: 7, name: 'Centauri Logistics', logo: logoCentauri },
  { id: 8, name: 'Colder Soluciones', logo: logoColder },
  { id: 9, name: 'La Venecia', logo: logoVenecia },
  { id: 10, name: 'Creesiente', logo: logoCreesiente },
  { id: 11, name: 'Cuts Factory', logo: logoCutsFactory },
  { id: 12, name: 'Damyfar Farmacias', logo: logoDamyfar },
  { id: 13, name: 'Detalles Chile', logo: logoDetallesChile },
  { id: 14, name: 'Electeik', logo: logoElecteik },
  { id: 15, name: 'Factorynet', logo: logoFactorynet },
  { id: 16, name: 'For Princes', logo: logoForPrinces },
  { id: 17, name: 'Fujisport', logo: logoFujisport },
  { id: 18, name: 'Fullgraf', logo: logoFullgraf },
  { id: 19, name: 'GOA Films', logo: logoGoaFilms },
  { id: 20, name: 'Graciamar', logo: logoGraciamar },
  { id: 21, name: 'Habitar', logo: logoHabitar },
  { id: 22, name: 'Indas Barbería', logo: logoIndasBarberia },
  { id: 23, name: 'JM Ascensores', logo: logoJMAscensores },
  { id: 24, name: 'Labdom', logo: logoLabdom },
  { id: 25, name: 'Inhaus', logo: logoInhaus },
  { id: 26, name: 'Malandra', logo: logoMalandra },
  { id: 27, name: 'Maquilladas.cl', logo: logoMaquilladas },
  { id: 28, name: 'Medicec', logo: logoMedicec },
  { id: 29, name: 'My Puppi', logo: logoMyPuppi },
  { id: 30, name: 'Oparts', logo: logoOparts },
  { id: 31, name: 'Orion', logo: logoOrion },
  { id: 32, name: 'Poleras Alexandra', logo: logoPolerasAlexandra },
  { id: 33, name: 'Rest Wok Grill', logo: logoRestWok },
  { id: 34, name: 'RPG Servicios', logo: logoRPGServicios },
  { id: 35, name: 'RUPU', logo: logoRupu },
  { id: 36, name: 'Viva Wellness', logo: logoVivaWellness },
  { id: 37, name: 'Zuvavit', logo: logoZuvavit }
];

const CompanyLogos = () => {
  // Split companies into groups for carousel rows
  const firstRow = companies.slice(0, 13);
  const secondRow = companies.slice(13, 26);
  const thirdRow = companies.slice(26, 37);

  return (
    <section className="py-16 bg-white relative z-10 shadow-lg overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark mb-4">
            Empresas que confían en nosotros
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-2">
            Más de 300 empresas han transformado su gestión contable con nosotros
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative space-y-6 overflow-hidden">
          {/* First Row - Moving Right */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-3 md:gap-6"
              animate={{
                x: ["0%", "-50%"]
              }}
              transition={{
                x: {
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              {/* Duplicate the array for seamless loop */}
              {[...firstRow, ...firstRow].map((company, index) => (
                <motion.div
                  key={`${company.id}-${index}-1`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % firstRow.length) * 0.1, duration: 0.8 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(160, 86, 153, 0.2)"
                  }}
                  className="flex-shrink-0 w-32 md:w-48 h-20 md:h-28 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center cursor-pointer p-2 md:p-4 group"
                >
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Second Row - Moving Left */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-3 md:gap-6"
              animate={{
                x: ["-50%", "0%"]
              }}
              transition={{
                x: {
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              {/* Duplicate the array for seamless loop */}
              {[...secondRow, ...secondRow].map((company, index) => (
                <motion.div
                  key={`${company.id}-${index}-2`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % secondRow.length) * 0.1, duration: 0.8 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(160, 86, 153, 0.2)"
                  }}
                  className="flex-shrink-0 w-32 md:w-48 h-20 md:h-28 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center cursor-pointer p-2 md:p-4 group"
                >
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Third Row - Moving Right */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-3 md:gap-6"
              animate={{
                x: ["0%", "-50%"]
              }}
              transition={{
                x: {
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              {/* Duplicate the array for seamless loop */}
              {[...thirdRow, ...thirdRow].map((company, index) => (
                <motion.div
                  key={`${company.id}-${index}-3`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % thirdRow.length) * 0.1, duration: 0.8 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(160, 86, 153, 0.2)"
                  }}
                  className="flex-shrink-0 w-32 md:w-48 h-20 md:h-28 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center cursor-pointer p-2 md:p-4 group"
                >
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-12 max-w-4xl mx-auto px-2"
        >
          <div className="text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="text-3xl font-bold text-brand-primary mb-1"
            >
              300+
            </motion.div>
            <p className="text-xs md:text-sm text-gray-600">Empresas activas</p>
          </div>
          <div className="text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="text-3xl font-bold text-brand-primary mb-1"
            >
              98%
            </motion.div>
            <p className="text-xs md:text-sm text-gray-600">Satisfacción</p>
          </div>
          <div className="text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatDelay: 4
              }}
              className="text-3xl font-bold text-brand-primary mb-1"
            >
              15+
            </motion.div>
            <p className="text-xs md:text-sm text-gray-600">Industrias</p>
          </div>
          <div className="text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatDelay: 5
              }}
              className="text-3xl font-bold text-brand-primary mb-1"
            >
              10 años
            </motion.div>
            <p className="text-xs md:text-sm text-gray-600">De experiencia</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyLogos;