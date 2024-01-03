import Store from '@/store';

const useStore = (module) => {
  return module ? Store[module] : Store;
};

export default useStore;
