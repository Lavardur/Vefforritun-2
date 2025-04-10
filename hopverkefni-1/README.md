# Leiðbeiningar um uppsetningu verkefnis

Þessar leiðbeiningar munu hjálpa þér að setja upp og keyra verkefnið á þinni tölvu.

## Hýsing

Verkefnið er hýst á eftirfarandi slóð:

[https://vefforritun-2-mn9h.onrender.com/](https://vefforritun-2-mn9h.onrender.com/)

Notandi
- username: admin
- password: Pass123!

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

  > **Athugið:** Seeding mun búa til admin notanda með eftirfarandi upplýsingum:
  >
  > - **Notandanafn:** admin
  > - **Lykilorð:** Pass123!

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
  - `POST /posts`: Búa til nýja færslu (auth required).
  - `GET /posts`: Sækja lista af öllum færslum með stuðningi fyrir síðuskiptingu (`?page=1&limit=10`).
  - `GET /posts/:id`: Sækja eina færslu eftir ID.
  - `PUT /posts/:id`: Uppfæra færslu eftir ID (auth required).
  - `DELETE /posts/:id`: Eyða færslu eftir ID (auth required).

- **Athugasemdir**
  - `POST /comments/posts/:postId`: Bæta athugasemd við færslu (auth required).
  - `GET /comments/posts/:postId`: Sækja athugasemdir fyrir færslu með stuðningi fyrir síðuskiptingu.
  - `PUT /comments/:commentId`: Uppfæra athugasemd (auth required, eigin athugasemdir).
  - `DELETE /comments/:commentId`: Eyða athugasemd (auth required, eigin athugasemdir).

- **Flokkar**
  - `POST /categories`: Búa til nýjan flokk (auth required).
  - `GET /categories`: Sækja lista af öllum flokkum með stuðningi fyrir síðuskiptingu.
  - `GET /categories/:id`: Sækja einn flokk eftir ID.
  - `PUT /categories/:id`: Uppfæra flokk eftir ID (auth required).
  - `DELETE /categories/:id`: Eyða flokk eftir ID (auth required).

- **Merki**
  - `POST /tags`: Búa til nýtt merki (auth required).
  - `GET /tags`: Sækja lista af öllum merkjum með stuðningi fyrir síðuskiptingu.
  - `GET /tags/:id`: Sækja eitt merki eftir ID.
  - `PUT /tags/:id`: Uppfæra merki eftir ID (auth required).
  - `DELETE /tags/:id`: Eyða merki eftir ID (auth required).

- **Læk**
  - `POST /like/posts/:postId`: Lækka færslu (auth required).
  - `DELETE /like/posts/:postId`: Af-lækka færslu (auth required).

- **Stjórnandi** (Krefst admin réttinda)
  - `GET /admin/users`: Sækja lista af öllum notendum með stuðningi fyrir síðuskiptingu.
  - `PUT /admin/users/:id`: Uppfæra notendaupplýsingar.
  - `DELETE /admin/users/:id`: Eyða notanda.
  - `PUT /admin/posts/:id`: Uppfæra hvaða færslu sem er.
  - `DELETE /admin/posts/:id`: Eyða hvaða færslu sem er.
  - `GET /admin/comments`: Sækja lista af öllum athugasemdum.
  - `DELETE /admin/comments/:id`: Eyða hvaða athugasemd sem er.
  - `PUT /admin/categories/:id`: Uppfæra hvaða flokk sem er.
  - `DELETE /admin/categories/:id`: Eyða hvaða flokk sem er.
  - `PUT /admin/tags/:id`: Uppfæra hvaða merki sem er.
  - `DELETE /admin/tags/:id`: Eyða hvaða merki sem er.

### Athugasemdir:

- Allir endapunktar sem eru merktir með "(auth required)" krefjast JWT auðkenningar með Bearer token í Authorization haus.
- Síðuskiptingarparametrar (`page` og `limit`) eru studdir fyrir endapunkta sem skila listum. Sjálfgefið `limit=10` og `page=1`.
- Admin endapunktar krefjast þess að notandi hafi `isAdmin=true` stillingu.
