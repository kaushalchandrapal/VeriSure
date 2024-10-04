import { m, domMax, LazyMotion } from 'framer-motion';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function MotionLazy({ children }: Props) {
  return (
    <LazyMotion strict features={domMax}>
      <m.div className='h-100' style={{ height: '100%' }}> {children} </m.div>
    </LazyMotion>
  );
}
