interface JwtConstants {
  secret: string;
}

export const jwtConstants: JwtConstants = {
  secret: process.env.JWT_SECRET || 'defaultSecret',
};
