export const config = {
  port: Number(process.env.PORT ?? 4000),
  db: {
    host:               process.env.DB_HOST     ?? 'localhost',
    port:               Number(process.env.DB_PORT ?? 3306),
    database:           process.env.DB_NAME     ?? 'french_tutor',
    user:               process.env.DB_USER     ?? 'appuser',
    password:           process.env.DB_PASSWORD ?? 'apppass',
    waitForConnections: true,
    connectionLimit:    Number(process.env.DB_POOL_CONNECTIONS ?? 10),
  },
}
