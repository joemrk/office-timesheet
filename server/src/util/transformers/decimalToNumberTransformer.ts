type DecimalToNumberTransformer = {
  to: (v: string | number) => number;
  from: (v: string) => number;
};

export const decimalToNumberTransformer = (): DecimalToNumberTransformer => ({
  to: (value) => {
    if (typeof value === 'string') {
      return Number(value.replace(/,/g, '.'));
    }
    return value;
  },
  from: (value) => Number(value),
});
