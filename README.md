# Poste Private Mazzetti – Sito Web
**Via Cibrario 63/C, Torino · P.IVA 13374610015**

---

## 📁 Struttura dei file

```
mazzetti-poste/
├── index.html      ← Pagina principale (tutte le sezioni)
├── styles.css      ← Stili (layout responsive, colori, tipografia)
├── script.js       ← Navigazione SPA e interazioni
└── README.md       ← Questo file
```

> Il sito è strutturato come **Single Page Application (SPA)**: tutte
> le "pagine" (Home, Spedizione, Visure, ecc.) sono sezioni all'interno
> di `index.html`. JavaScript gestisce la navigazione mostrando/nascondendo
> le sezioni senza ricaricare la pagina.

---

## 🖥️ Anteprima locale (senza internet)

1. Apri la cartella `mazzetti-poste/`
2. Fai doppio clic su `index.html`
3. Il sito si apre nel browser già funzionante

> ⚠️ Per il font Google Fonts è necessaria la connessione internet.
> Offline il browser userà un font di sistema, ma il layout rimane integro.

---

## 🚀 Pubblicazione su Netlify (CONSIGLIATO – gratuito)

### Metodo A – Trascina e rilascia (il più semplice)

1. Vai su **[netlify.com](https://www.netlify.com)** e crea un account gratuito
2. Nella dashboard, cerca il riquadro **"Deploy manually"** o vai su:
   `Sites → Add new site → Deploy manually`
3. **Trascina l'intera cartella `mazzetti-poste/`** nella zona di upload
4. Netlify pubblica il sito in 30 secondi e ti fornisce un URL tipo:
   `https://nome-casuale.netlify.app`
5. Per cambiare il nome del sottodominio:
   `Site settings → Domain management → Edit site name`

### Metodo B – Via GitHub (aggiornamenti automatici)

1. Crea un account su **[github.com](https://github.com)** (gratuito)
2. Crea un nuovo repository: `+ New → Repository name: poste-mazzetti → Create`
3. Carica i file: `Add file → Upload files → seleziona tutti e 3 i file`
4. Vai su **[netlify.com](https://www.netlify.com)** → `Add new site → Import an existing project`
5. Seleziona GitHub → autorizza → scegli il repository
6. Impostazioni build: lascia tutto vuoto (sito statico puro)
7. Clicca **Deploy site**

**Vantaggio:** ogni volta che modifichi un file su GitHub, il sito si aggiorna in automatico.

---

## 📄 Pubblicazione su GitHub Pages (alternativa gratuita)

1. Crea un account su **[github.com](https://github.com)**
2. Crea un repository con nome `poste-mazzetti`
3. Carica i 3 file (`index.html`, `styles.css`, `script.js`)
4. Vai in `Settings → Pages`
5. In **Source** seleziona: `Deploy from a branch`
6. Branch: `main` · Folder: `/ (root)` → Clicca **Save**
7. Dopo 2-3 minuti il sito sarà online all'indirizzo:
   `https://tuo-username.github.io/poste-mazzetti/`

---

## 🌐 Pubblicazione con dominio personalizzato

Se vuoi un indirizzo tipo `www.postemazzetti.it`:

### 1. Acquista il dominio
- **Aruba**: [aruba.it](https://www.aruba.it) – ~10-15€/anno
- **Register.it**: [register.it](https://www.register.it) – ~12€/anno
- **Namecheap**: [namecheap.com](https://www.namecheap.com) – ~8€/anno

### 2. Collega il dominio a Netlify
1. Su Netlify: `Site settings → Domain management → Add custom domain`
2. Inserisci il tuo dominio (es. `postemazzetti.it`)
3. Netlify ti mostrerà i **nameserver** da copiare (tipo `dns1.p01.nsone.net`)
4. Nel pannello del tuo registrar (Aruba, ecc.), vai in **DNS/Nameserver**
5. Sostituisci i nameserver con quelli di Netlify
6. Attendi 24-48h per la propagazione DNS
7. Netlify aggiunge automaticamente **HTTPS gratuito** (certificato Let's Encrypt)

---

## ✏️ Come modificare il sito

Tutti i contenuti sono in `index.html`. Apri il file con un editor di testo
(Notepad++, VS Code, o anche Notepad) e cerca le sezioni tramite i commenti:

```
<!-- ───────────────────── NOME SEZIONE ───────────────────── -->
```

### Modifiche frequenti:

| Cosa modificare | Dove cercarlo in index.html |
|---|---|
| Numero di telefono | Cerca `0115694940` o `3495485647` |
| Indirizzo | Cerca `Via Cibrario` |
| Orari apertura | Aggiungi nella sezione `#contatti` |
| Link WhatsApp | Cerca `api.whatsapp.com` |
| Colori | Apri `styles.css`, modifica le variabili in `:root {}` |
| Font | Cerca il link Google Fonts in `<head>` di index.html |

### Cambiare i colori principali (styles.css, righe 8-9):
```css
--blue:   #1A3A6B;   /* Cambia qui il blu */
--yellow: #FFD100;   /* Cambia qui il giallo */
```

---

## 📞 Supporto tecnico

Per qualsiasi problema con la pubblicazione o le modifiche, è possibile
rivolgersi a un tecnico web locale o contattare il supporto di Netlify
(disponibile in inglese su [netlify.com/support](https://www.netlify.com/support)).

---

*Sito realizzato per Poste Private di Stefano Mazzetti – Torino*
*P.IVA 13374610015 · "Facile e Veloce"*
