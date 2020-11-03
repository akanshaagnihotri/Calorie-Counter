interface Invalid {
  errorMessage: string | null;
}

export const Invalid = class implements Invalid {
  public errorMessage: string | null;

  public constructor(message?: string) {
    this.errorMessage = message || null;
  }
};

export type InvalidOr<T> = Invalid | T;

type IsInvalidTypeGuard<T> = (errorOrT: InvalidOr<T>) => errorOrT is Invalid;

export type Validate<T> = (t: T) => InvalidOr<T>;

export const isInvalid: IsInvalidTypeGuard<{}> = (errorOrT): errorOrT is Invalid => {
  return (errorOrT as Invalid).errorMessage !== undefined;
};
