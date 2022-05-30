import { useNetwork } from '../helpers/NetworkProvider';

const useIsClassic = () => {
  const { name } = useNetwork();
  return name === 'classic';
};

export default useIsClassic;
