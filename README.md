# Take home project

The current project is part of a selection process for a Software Engineer position on SindriaAi startup.

The description of the task is accessible [here](https://sindriaai.notion.site/Take-home-project-b8bda5098d744ce9a60d48e1fd591432)

## Database

For this project, the chosen database was SQLite once the propose was just for a prove of concept. The data modeling was the given:

#### Table `questions`:

| Column name  | Data type | Description                            |
| ------------ | --------- | -------------------------------------- |
| id (PK)      | interger  | The autoincrement id for the the table |
| question     | text      | The question statement                 |
| support      | text      | The question answer explanation        |
| answer       | text      | The correct answer for this question   |
| alternatives | json      | The alternatives for this question     |

PS: All the questions here were treated as multiple choice questions.

### Data source

Rather than generating each question individually, I opted to select a biology question database presented as a JSON file. To ensure authenticity, I chose a database utilized in AI training, comprising questions sourced from real exams. The reference for this selection is provided [here](https://allenai.org/data/sciq).

## Installation

```bash
# Install package.json dependencies
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod

# compose app in docker container
$ yarn compose
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## Deploy

For deployment, the App Engine (a service provided by Google Cloud Platform - GCP) was chosen for its simplicity and cost-effectiveness (it defaults to disabling the service when the application is idle). The `app.yaml` file describes the service, and deploying requires only the following command:

```bash
$ gcloud app deploy
```

Note: The GPC project needs to be previously created and the gcloud needs to be installed and logged in.

## Application

The application is accessible on `https://https://triple-nectar-407416.uc.r.appspot.com` (created automatically by the App Engine).

The swagger documentation is accessible on: `https://https://triple-nectar-407416.uc.r.appspot.com/doc`

### Getting the questions

```
GET: /questions
```

Example of answer:

```json
[
  {
    "id": 42,
    "question": "What must replicate in the cell cycle before meiosis i takes place?",
    "alternatives": {
      "A": "meiotic fluid",
      "B": "cell walls",
      "C": "sperm",
      "D": "dna"
    }
  },
  {
    "id": 43,
    "question": "What phenomenon is primarily the result of plate tectonic motions?",
    "alternatives": {
      "A": "volcanoes",
      "B": "tsunamis",
      "C": "eruption",
      "D": "earthquake"
    }
  },
  {
    "id": 44,
    "question": "What is a group of neuron cell bodies in the periphery called?",
    "alternatives": {
      "A": "gangism",
      "B": "organism",
      "C": "ganglion",
      "D": "crystals"
    }
  },
  {
    "id": 45,
    "question": "Where does most of our food come from?",
    "alternatives": {
      "A": "microbes",
      "B": "lichen",
      "C": "gymnosperms",
      "D": "angiosperms"
    }
  },
  {
    "id": 46,
    "question": "Gases are most ideal at high temperature and what pressure?",
    "alternatives": {
      "A": "absolute",
      "B": "high",
      "C": "low",
      "D": "stable"
    }
  },
  {
    "id": 47,
    "question": "Hard igneous rocks and easily dissolved sedimentary rocks respond very differently to what natural force?",
    "alternatives": {
      "A": "sunlight",
      "B": "weathering",
      "C": "gravity",
      "D": "evaporation"
    }
  },
  {
    "id": 48,
    "question": "A diet rich in calcium and what vitamin may reduce the risk of osteoporosis and related bone fractures?",
    "alternatives": {
      "A": "niacin",
      "B": "vitamin A",
      "C": "vitamin C",
      "D": "vitamin d"
    }
  },
  {
    "id": 49,
    "question": "How many people die from air pollution each year?",
    "alternatives": {
      "A": "17 million",
      "B": "14 million",
      "C": "22 million",
      "D": "5 million"
    }
  },
  {
    "id": 50,
    "question": "What substances serve as catalysts in most of the biochemical reactions that take place in organisms?",
    "alternatives": {
      "A": "enzymes",
      "B": "carbohydrates",
      "C": "hormones",
      "D": "iseotrops"
    }
  },
  {
    "id": 51,
    "question": "The formation of an amalgam allows the metal to react with what?",
    "alternatives": {
      "A": "cloth and plastic",
      "B": "blood and sweat",
      "C": "air and water",
      "D": "helium and oxygen"
    }
  }
]
```

### Answer the quiz:

This endpoint is responsible for receive the answers and return the grade. For each question, the support explanation for the correct answer is returned.

```sh
POST: /questions/answer
```

Payload de exemplo:

```json
{
  "answers": [
    {
      "id": 42,
      "answer": "D"
    },
    {
      "id": 43,
      "answer": "C"
    },
    {
      "id": 44,
      "answer": "C"
    }
  ]
}
```

Example of response:

```json
{
  "review": [
    {
      "id": 42,
      "answer": "D",
      "expect": "D",
      "correct": true,
      "support": "Meiosis I begins after DNA replicates during interphase of the cell cycle. In both meiosis I and meiosis II , cells go through the same four phases as mitosis - prophase, metaphase, anaphase and telophase. However, there are important differences between meiosis I and mitosis. The eight stages of meiosis are summarized below. The stages will be described for a human cell, starting with 46 chromosomes."
    },
    {
      "id": 43,
      "answer": "C",
      "expect": "D",
      "correct": false,
      "support": "Earthquakes are primarily the result of plate tectonic motions. What type of stress would cause earthquakes at each of the three types of plate boundaries?."
    },
    {
      "id": 44,
      "answer": "C",
      "expect": "C",
      "correct": true,
      "support": "Ganglia A ganglion is a group of neuron cell bodies in the periphery. Ganglia can be categorized, for the most part, as either sensory ganglia or autonomic ganglia, referring to their primary functions. The most common type of sensory ganglion is a dorsal (posterior) root ganglion. These ganglia are the cell bodies of neurons with axons that are sensory endings in the periphery, such as in the skin, and that extend into the CNS through the dorsal nerve root. The ganglion is an enlargement of the nerve root. Under microscopic inspection, it can be seen to include the cell bodies of the neurons, as well as bundles of fibers that are the posterior nerve root (Figure 13.19). The cells of the dorsal root ganglion are unipolar cells, classifying them by shape. Also, the small round nuclei of satellite cells can be seen surrounding—as if they were orbiting—the neuron cell bodies."
    }
  ],
  "grade": {
    "percentage": "66.67",
    "grade": "D"
  }
}
```
