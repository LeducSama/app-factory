# App Factory

Ton usine à applications. Tu décris ce que tu veux, Claude fait le reste : le code, les
tests, la mise en ligne du site web et la création de l'application Android.

Rien à installer sur ton ordinateur. Tout tourne dans le cloud.

## Au quotidien

1. Ouvre [claude.ai/code](https://claude.ai/code) : dans le navigateur, dans l'appli mobile
   (onglet Code) ou dans l'appli de bureau en choisissant un environnement Cloud.
2. Choisis ce dépôt.
3. Écris ce que tu veux. Par exemple : « Fais une appli de suivi de dépenses avec des
   catégories et un graphique par mois. »

Pour une nouvelle appli ou une grosse fonctionnalité, Claude te pose au plus trois questions
et te montre un résumé. Tu réponds « ok » et il construit. Pour les petites modifications,
il le fait directement.

## Où trouver ton appli

Remplace `PSEUDO` par ton pseudo GitHub et `DEPOT` par le nom du dépôt.

| | Lien |
| --- | --- |
| Web | `https://PSEUDO.github.io/DEPOT/` |
| Android | `https://github.com/PSEUDO/DEPOT/releases/download/android-latest/app.apk` |

Les deux se mettent à jour tout seuls après chaque modification : quelques minutes pour le
web, environ quinze minutes pour Android. Sur le téléphone, ouvre le lien Android, télécharge
`app.apk` et ouvre le fichier. La première fois, Android demande d'autoriser l'installation
depuis cette source. Les versions suivantes s'installent par dessus.

## Une nouvelle appli, un nouveau dépôt

Ce dépôt sert de modèle. Pour démarrer une autre appli, ouvre ce dépôt sur GitHub, clique
sur « Use this template », donne un nom, puis ouvre le nouveau dépôt dans claude.ai/code.
Ta première demande transforme le modèle en ta nouvelle appli.

Si l'application GitHub de Claude n'a accès qu'à certains dépôts, ajoute le nouveau dans ses
réglages sur GitHub. En lui donnant accès à tous tes dépôts, tu n'as plus rien à faire.

## Ce qu'il y a dedans

| Élément | Rôle |
| --- | --- |
| `CLAUDE.md` | Les règles que Claude suit : questions, plan, tests, relecture, mise en ligne |
| `.claude/agents/` | Planificateur, guide de tests et relecteurs de code |
| `.claude/skills/` | Bonnes pratiques React Native, vérification, finition de l'interface |
| `.github/workflows/` | Mise en ligne du web et création de l'APK Android à chaque modification |
| `src/` | Le code de l'appli (Expo, une seule base pour Android et le web) |

## Crédits

Agents et skills tirés de [ECC](https://github.com/affaan-m/ECC) par Affaan Mustafa, licence
MIT (voir `.claude/ECC-LICENSE`). Base de l'appli : modèle Expo, licence MIT (voir `LICENSE`).
