import axios from 'axios';
import { useQuery } from 'react-query';
import { TERRA_ASSETS } from '../helpers/constants';
import { useNetwork } from '../helpers/NetworkProvider';
import { ContractInfo } from '../helpers/types';

type NetworkName = string;
type Address = string;
type Data = Record<NetworkName, Record<Address, ContractInfo>>;

const useContracts = () => {
  const { name } = useNetwork();
  const config = { baseURL: TERRA_ASSETS };
  return useQuery('Contracts', async () => {
    const { data } = await axios.get<Data>('cw20/contracts.json', config);
    return data[name];
  });
};

export default useContracts;
