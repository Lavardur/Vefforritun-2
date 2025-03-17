# Leiðbeiningar um uppsetningu verkefnis

Þessar leiðbeiningar munu hjálpa þér að setja upp og keyra verkefnið á þinni tölvu.

## Uppsetning

1. **Afritaðu repoið:**

   ```sh
   git clone https://github.com/Lavardur/Vefforritun-2/tree/main/hopverkefni-1.git
   cd hopverkefni-1
   ```

2. **Settu upp dependencies:**

   ```sh
   npm ci
   ```

3. **Settu upp umhverfisbreytur:**

   Búðu til `.env` skrá í rótarmöppunni og bættu við eftirfarandi breytum:

   ```sh
   DATABASE_URL="slóð-þín-að-gagnagrunni"
   JWT_ACCESS_SECRET="þitt-jwt-leyndarmál"
   ```

   Skiptu út `slóð-þín-að-gagnagrunni` fyrir PostgreSQL tengistrenginn þinn og `þitt-jwt-leyndarmál` fyrir leyndarmál lykil fyrir JWT.

4. **Settu upp gagnagrunninn:**

   Gakktu úr skugga um að PostgreSQL sé í gangi og keyrðu síðan eftirfarandi skipanir til að setja upp gagnagrunninn:

   ```sh
   npx prisma migrate deploy
   npm run seed
   ```

5. **Keyrðu verkefnið:**

   ```sh
   npm run dev
   ```

   Þjónninn ætti nú að vera í gangi á `http://localhost:3000`.

## Keyra prófanir

Til að keyra prófanir, notaðu eftirfarandi skipun:

```sh
npm test
```

Þú getur einnig keyrt sérstakar prófanir:

```sh
npm run test:sanitization
npm run test:auth
npm run test:pagination
npm run test:posts
```

## Linting

Til að athuga linting villur, keyrðu:

```sh
npm run lint
```

Til að laga linting villur sjálfkrafa, keyrðu:

```sh
npm run lint:fix
```

## Endurstilla gagnagrunninn

Til að endurstilla gagnagrunninn og fylla hann með upphafsgögnum, keyrðu:

```sh
npm run reset-db
```

## Viðbótarupplýsingar

- **Prisma Studio:** Til að skoða og breyta gögnum, keyrðu:

  ```sh
  npx prisma studio
  ```

## API Endapunktar

- **Notendaskráning og innskráning**
  - `POST /register`: Skrá nýjan notanda.
  - `POST /login`: Staðfesta notanda og skila JWT token.

- **Færslur**
  - `POST /posts`: Búa til nýja færslu.
  - `GET /posts`: Sækja lista af öllum færslum.
  - `GET /posts/:id`: Sækja eina færslu eftir ID.
  - `PUT /posts/:id`: Uppfæra færslu eftir ID.
  - `DELETE /posts/:id`: Eyða færslu eftir ID.

- **Athugasemdir**
  - `POST /posts/:postId/comments`: Bæta athugasemd við færslu.
  - `GET /posts/:postId/comments`: Sækja allar athugasemdir fyrir færslu.
  - `PUT /comments/:commentId`: Uppfæra athugasemd eftir ID.
  - `DELETE /comments/:commentId`: Eyða athugasemd eftir ID.

- **Flokkar**
  - `POST /categories`: Búa til nýjan flokk.
  - `GET /categories`: Sækja lista af öllum flokkum.
  - `GET /categories/:id`: Sækja einn flokk eftir ID.
  - `PUT /categories/:id`: Uppfæra flokk eftir ID.
  - `DELETE /categories/:id`: Eyða flokk eftir ID.

- **Merki**
  - `POST /tags`: Búa til nýtt merki.
  - `GET /tags`: Sækja lista af öllum merkjum.
  - `GET /tags/:id`: Sækja eitt merki eftir ID.
  - `PUT /tags/:id`: Uppfæra merki eftir ID.
  - `DELETE /tags/:id`: Eyða merki eftir ID.

- **Læk**
  - `POST /posts/:postId/like`: Lækka færslu.
  - `DELETE /posts/:postId/like`: Af-lækka færslu.

- **Stjórnandi**
  - `GET /admin/users`: Skoða alla notendur.
  - `PUT /admin/users/:id`: Uppfæra notendaupplýsingar.
  - `DELETE /admin/users/:id`: Eyða notanda.
  - `PUT /admin/posts/:id`: Uppfæra hvaða færslu sem er.
  - `DELETE /admin/posts/:id`: Eyða hvaða færslu sem er.
  - `GET /admin/comments`: Skoða allar athugasemdir.
  - `DELETE /admin/comments/:id`: Eyða hvaða athugasemd sem er.
  - `PUT /admin/categories/:id`: Uppfæra hvaða flokk sem er.
  - `DELETE /admin/categories/:id`: Eyða hvaða flokk sem er.
  - `PUT /admin/tags/:id`: Uppfæra hvaða merki sem er.
  - `DELETE /admin/tags/:id`: Eyða hvaða merki sem er.
