import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    const result = cn('base-class', 'additional-class');
    expect(result).toContain('base-class');
    expect(result).toContain('additional-class');
  });

  it('should handle conditional classes', () => {
    const result = cn('base', true && 'conditional', false && 'not-included');
    expect(result).toContain('base');
    expect(result).toContain('conditional');
    expect(result).not.toContain('not-included');
  });

  it('should handle undefined and null values', () => {
    const result = cn('base', undefined, null, 'valid');
    expect(result).toContain('base');
    expect(result).toContain('valid');
  });

  it('should handle Tailwind CSS conflicts correctly', () => {
    const result = cn('px-2', 'px-4');
    // Should prefer the last class (Tailwind merge behavior)
    expect(result).toBe('px-4');
  });

  it('should merge multiple utility classes', () => {
    const result = cn(
      'text-sm font-medium',
      'text-blue-500',
      'hover:text-blue-700'
    );
    expect(result).toContain('font-medium');
    expect(result).toContain('text-blue-500');
    expect(result).toContain('hover:text-blue-700');
  });
});

