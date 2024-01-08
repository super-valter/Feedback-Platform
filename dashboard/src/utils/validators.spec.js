import { validateEmptyAndLength3, validateEmptyAndEmail } from './validators';

describe('Validation Functions', () => {
  describe('validateEmptyAndLength3', () => {
    it('should return error message for empty value', () => {
      const result = validateEmptyAndLength3('');
      expect(result).toBe('*Este campo é obrigatório.');
    });

    it('should return error message for value with less than 3 characters', () => {
      const result = validateEmptyAndLength3('ab');
      expect(result).toBe('*Este campo precisa de no mínimo 3 caracteres.');
    });

    it('should return true for valid input', () => {
      const result = validateEmptyAndLength3('abc');
      expect(result).toBe(true);
    });
  });

  describe('validateEmptyAndEmail', () => {
    it('should return error message for empty value', () => {
      const result = validateEmptyAndEmail('');
      expect(result).toBe('*Este campo é obrigatório');
    });

    it('should return error message for invalid email', () => {
      const result = validateEmptyAndEmail('invalidemail');
      expect(result).toBe('*Este campo precisa ser um e-mail.');
    });

    it('should return true for valid email', () => {
      const result = validateEmptyAndEmail('valid@example.com');
      expect(result).toBe(true);
    });
  });
});
