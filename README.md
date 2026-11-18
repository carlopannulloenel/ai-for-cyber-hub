# AI for Cyber · Opportunity Hub

Prototipo navigabile per esplorare i processi di cybersecurity e valutare **dove l'intelligenza artificiale può supportarli**. Non è un sistema di technology scouting e non suggerisce automaticamente acquisti o tecnologie.

## Cosa fa il prototipo

- **Home**: panoramica del catalogo e delle valutazioni
- **Domini**: navigazione nella stessa pagina da funzione NIST → macrodominio → processo → use case AI
- **Dettaglio processo**: attività, capability AI, input, output, KPI, autonomia, rischi, controlli, process owner, priorità e storico
- **Valutazioni in corso**: presa in carico, Evaluation Owner, appunti, filtri e transizioni di stato
- **Processi critici**: lista dinamica delle 10 priorità iniziali non ancora `VALUTATO`, con motivazioni esplicite
- **Esportazione JSON**: dal menu del profilo è possibile salvare una copia delle valutazioni della demo

Stati: `NON VALUTATO`, `IN VALUTAZIONE`, `SCARTATO`, `VALUTATO`.

## Dati

Il file `src/data/catalogue.json` deriva da `Studio_AI_Cybersecurity_catalogo_consolidato_v1.xlsx`, fogli **Catalogo consolidato** e **Matrice copertura**.

- 177 use case mappati in 173 processi distinti
- Perimetro principale **AI for Cybersecurity**: 161 use case in 157 processi, 21 macrodomini
- **Cybersecurity for AI**: 16 use case distinti, non visualizzati per impostazione predefinita
- Nessuna tecnologia candidata è riportata nelle schede: volutamente fuori dal perimetro MVP
- I valori ancora da validare nel catalogo (ad es. process owner) restano esplicitamente non definiti
- La Top 10 è una **selezione editoriale indicativa** basata sulla shortlist iniziale e su rilevanza/riusabilità/misurabilità. Non è una priorità aziendale validata

Non pubblicare documenti o dati riservati su un repository GitHub pubblico prima di aver verificato il perimetro di disclosure.

## Come provarlo in locale

Non servono Node.js né dipendenze da installare.

```bash
python -m http.server 8000
```

Apri `http://localhost:8000`. Non aprire direttamente `index.html` dal filesystem perché il browser blocca il caricamento del JSON via `fetch`.

Il layout utilizza font di sistema, senza dipendenze esterne per la visualizzazione.

## Pubblicazione su GitHub Pages

1. Crea un repository GitHub e carica **il contenuto di questa cartella nella root** (in particolare `index.html`, `src/`, `favicon.svg`).
2. Apri il repository: **Settings → Pages → Build and deployment**.
3. Imposta **Deploy from a branch**, branch `main`, directory `/ (root)` e salva.
4. Il sito sarà accessibile all'indirizzo GitHub Pages mostrato nella sezione Pages.

Non serve una pipeline CI né una build. Gli URL degli asset sono relativi e funzionano anche nei siti Pages pubblicati sotto `/nome-repo/`.

## Cosa è demo e cosa no

**Funziona:** navigazione, ricerca e filtri, presa in carico, note e storico delle transizioni, scarto/completamento, rientro in valutazione ed export JSON.

**Non è ancora implementato:** autenticazione, database multiutente, modifica condivisa del catalogo, autorizzazioni, assistente AI e ricerca ad hoc su tecnologie. L'eventuale assistente in Valutazioni è mostrato solo come **funzionalità futura**.

Le valutazioni sono salvate nel `localStorage` del singolo browser. Non sono condivise e non sono un repository di decisioni aziendali. Per il passaggio a un utilizzo collaborativo serviranno autenticazione, API/backend, audit log e DB con controllo accessi.

## Modello dati in evoluzione

- `catalogue.macros`: funzioni, macrodomini e perimetro
- `catalogue.processes`: processo e uno o più use case collegati
- `evaluations`: owner della valutazione, data di apertura e chiusura, note, stato ed esito
- Priorità e motivazioni iniziali: campo `priority`/`priorityReason`, da validare e rendere gestibile centralmente in una fase successiva

Per la prima demo non ci sono dati di utilizzo reali, process owner nominativi o punteggi misurati. Nessuna funzionalità di AI è spacciata per attiva.
