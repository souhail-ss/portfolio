import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { portfolioData, profile } from '../../data/portfolio.data';
import * as S from './Hero.styles';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const technologies = ['TypeScript', 'NestJS', 'Next.js', 'React', 'PostgreSQL', 'MongoDB'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <S.HeroSection id="home" ref={containerRef}>
      <S.GridBackground />

      <S.WaveBackground />

      <S.SpotlightEffect style={{ x: spotlightX, y: spotlightY }} />

      <div className="container">
<S.HeroContent>
  {/* LEFT COLUMN */}
  <S.LeftColumn>
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <S.Name variants={itemVariants}>
        {portfolioData.fullName}
      </S.Name>

      <S.Title variants={itemVariants}>
        {portfolioData.headline}
      </S.Title>

      <S.StatsRow variants={itemVariants}>
        <S.Stat>
          <S.StatNumber>1+</S.StatNumber>
          <S.StatLabel>Exp.</S.StatLabel>
        </S.Stat>
        <S.Stat>
          <S.StatNumber>5+</S.StatNumber>
          <S.StatLabel>Projects</S.StatLabel>
        </S.Stat>
        <S.Stat>
          <S.StatNumber>15+</S.StatNumber>
          <S.StatLabel>Technologies</S.StatLabel>
        </S.Stat>
      </S.StatsRow>
    </motion.div>
  </S.LeftColumn>

  {/* RIGHT COLUMN - A propos */}
  <S.RightColumn>
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <S.AboutCard variants={itemVariants}>
        <S.AboutHeader>
          <S.ProfileImage>
            <img src={profile.profileImage} alt={profile.fullName} />
          </S.ProfileImage>
          <S.ProfileInfo>
            <S.AboutLabel>A propos</S.AboutLabel>
            <S.Location>
              <MapPin size={14} />
              {profile.location.city}, {profile.location.country}
            </S.Location>
          </S.ProfileInfo>
        </S.AboutHeader>

        <S.AboutDescription>
          {profile.about.short}
        </S.AboutDescription>

        <S.TechTags>
          {technologies.map((tech) => (
            <S.TechTag key={tech}>{tech}</S.TechTag>
          ))}
        </S.TechTags>

        <S.AboutActions>
          <S.ActionButtons>
            <S.CTAButton
              href="#experience"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Voir mon parcours
              <ArrowRight size={16} />
            </S.CTAButton>
            <S.DownloadButton
              href={portfolioData.resumeUrl}
              download
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={16} />
              CV
            </S.DownloadButton>
          </S.ActionButtons>
          <S.SocialLinks>
            <S.SocialLink
              href={portfolioData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={18} />
            </S.SocialLink>
            <S.SocialLink
              href={portfolioData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} />
            </S.SocialLink>
            <S.SocialLink
              href={`mailto:${portfolioData.email}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={18} />
            </S.SocialLink>
          </S.SocialLinks>
        </S.AboutActions>
      </S.AboutCard>
    </motion.div>
  </S.RightColumn>
</S.HeroContent>
      </div>

      <S.ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Scroll
        <S.ScrollLine
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </S.ScrollIndicator>
    </S.HeroSection>
  );
};
