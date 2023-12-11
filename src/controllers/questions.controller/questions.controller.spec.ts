import { PrismaService, QuestionsService, UtilsService } from "../../providers";
import { QuestionsController } from "./questions.controller";
import { QuestionRepository } from "../../providers/repositories";
import { AnswersDTO } from "src/dtos";

describe("QuestionsController", () => {
  let questionsController: QuestionsController;
  let questionsService: QuestionsService;
  let prismaService: PrismaService;
  let utilsService: UtilsService;
  let questionRepository: QuestionRepository;

  beforeEach(() => {
    utilsService = new UtilsService();
    prismaService = new PrismaService();
    questionRepository = new QuestionRepository(prismaService, utilsService);
    questionsService = new QuestionsService(questionRepository);
    questionsController = new QuestionsController(questionsService);
  });

  describe("get", () => {
    it("should return 10 questions", async () => {
      const result = [
        {
          id: 42,
          question:
            "What must replicate in the cell cycle before meiosis i takes place?",
          alternatives: `{
            A: "meiotic fluid",
            B: "cell walls",
            C: "sperm",
            D: "dna",
          }`,
        },
        {
          id: 43,
          question:
            "What phenomenon is primarily the result of plate tectonic motions?",
          alternatives: `{
            A: "volcanoes",
            B: "tsunamis",
            C: "eruption",
            D: "earthquake",
          }`,
        },
        {
          id: 44,
          question:
            "What is a group of neuron cell bodies in the periphery called?",
          alternatives: `{
            A: "gangism",
            B: "organism",
            C: "ganglion",
            D: "crystals",
          }`,
        },
        {
          id: 45,
          question: "Where does most of our food come from?",
          alternatives: `{
            A: "microbes",
            B: "lichen",
            C: "gymnosperms",
            D: "angiosperms",
          }`,
        },
        {
          id: 46,
          question:
            "Gases are most ideal at high temperature and what pressure?",
          alternatives: `{
            A: "absolute",
            B: "high",
            C: "low",
            D: "stable",
          }`,
        },
        {
          id: 47,
          question:
            "Hard igneous rocks and easily dissolved sedimentary rocks respond very differently to what natural force?",
          alternatives: `{
            A: "sunlight",
            B: "weathering",
            C: "gravity",
            D: "evaporation",
          }`,
        },
        {
          id: 48,
          question:
            "A diet rich in calcium and what vitamin may reduce the risk of osteoporosis and related bone fractures?",
          alternatives: `{
            A: "niacin",
            B: "vitamin A",
            C: "vitamin C",
            D: "vitamin d",
          }`,
        },
        {
          id: 49,
          question: "How many people die from air pollution each year?",
          alternatives: `{
            A: "17 million",
            B: "14 million",
            C: "22 million",
            D: "5 million",
          }`,
        },
        {
          id: 50,
          question:
            "What substances serve as catalysts in most of the biochemical reactions that take place in organisms?",
          alternatives: `{
            A: "enzymes",
            B: "carbohydrates",
            C: "hormones",
            D: "iseotrops",
          }`,
        },
        {
          id: 51,
          question:
            "The formation of an amalgam allows the metal to react with what?",
          alternatives: `{
            A: "cloth and plastic",
            B: "blood and sweat",
            C: "air and water",
            D: "helium and oxygen",
          }`,
        },
      ];
      jest
        .spyOn(questionRepository, "getRandom")
        .mockImplementation(async () => result);
      expect(await questionsController.get()).toBe(result);
    });
  });

  describe("answer", () => {
    it("should return the grade of the quiz", async () => {
      const result = [
        {
          id: 42,
          question:
            "What must replicate in the cell cycle before meiosis i takes place?",
          alternatives: `{
            A: "meiotic fluid",
            B: "cell walls",
            C: "sperm",
            D: "dna",
          }`,
          answer: "D",
          support:
            "Meiosis I begins after DNA replicates during interphase of the cell cycle. In both meiosis I and meiosis II , cells go through the same four phases as mitosis - prophase, metaphase, anaphase and telophase. However, there are important differences between meiosis I and mitosis. The eight stages of meiosis are summarized below. The stages will be described for a human cell, starting with 46 chromosomes.",
        },
        {
          id: 43,
          question:
            "What phenomenon is primarily the result of plate tectonic motions?",
          alternatives: `{
            A: "volcanoes",
            B: "tsunamis",
            C: "eruption",
            D: "earthquake",
          }`,
          answer: "D",
          support:
            "Earthquakes are primarily the result of plate tectonic motions. What type of stress would cause earthquakes at each of the three types of plate boundaries?.",
        },
        {
          id: 44,
          question:
            "What is a group of neuron cell bodies in the periphery called?",
          alternatives: `{
            A: "gangism",
            B: "organism",
            C: "ganglion",
            D: "crystals",
          }`,
          answer: "C",
          support:
            "Ganglia A ganglion is a group of neuron cell bodies in the periphery. Ganglia can be categorized, for the most part, as either sensory ganglia or autonomic ganglia, referring to their primary functions. The most common type of sensory ganglion is a dorsal (posterior) root ganglion. These ganglia are the cell bodies of neurons with axons that are sensory endings in the periphery, such as in the skin, and that extend into the CNS through the dorsal nerve root. The ganglion is an enlargement of the nerve root. Under microscopic inspection, it can be seen to include the cell bodies of the neurons, as well as bundles of fibers that are the posterior nerve root (Figure 13.19). The cells of the dorsal root ganglion are unipolar cells, classifying them by shape. Also, the small round nuclei of satellite cells can be seen surrounding—as if they were orbiting—the neuron cell bodies.",
        },
      ];
      jest
        .spyOn(questionRepository, "getRandom")
        .mockImplementation(async () => result);

      const payload = {
        answers: [
          {
            id: 42,
            answer: "D",
          },
          {
            id: 43,
            answer: "C",
          },
          {
            id: 44,
            answer: "C",
          },
        ],
      };

      const expectedAnswer = {
        review: [
          {
            id: 42,
            answer: "D",
            expect: "D",
            correct: true,
            support:
              "Meiosis I begins after DNA replicates during interphase of the cell cycle. In both meiosis I and meiosis II , cells go through the same four phases as mitosis - prophase, metaphase, anaphase and telophase. However, there are important differences between meiosis I and mitosis. The eight stages of meiosis are summarized below. The stages will be described for a human cell, starting with 46 chromosomes.",
          },
          {
            id: 43,
            answer: "C",
            expect: "D",
            correct: false,
            support:
              "Earthquakes are primarily the result of plate tectonic motions. What type of stress would cause earthquakes at each of the three types of plate boundaries?.",
          },
          {
            id: 44,
            answer: "C",
            expect: "C",
            correct: true,
            support:
              "Ganglia A ganglion is a group of neuron cell bodies in the periphery. Ganglia can be categorized, for the most part, as either sensory ganglia or autonomic ganglia, referring to their primary functions. The most common type of sensory ganglion is a dorsal (posterior) root ganglion. These ganglia are the cell bodies of neurons with axons that are sensory endings in the periphery, such as in the skin, and that extend into the CNS through the dorsal nerve root. The ganglion is an enlargement of the nerve root. Under microscopic inspection, it can be seen to include the cell bodies of the neurons, as well as bundles of fibers that are the posterior nerve root (Figure 13.19). The cells of the dorsal root ganglion are unipolar cells, classifying them by shape. Also, the small round nuclei of satellite cells can be seen surrounding—as if they were orbiting—the neuron cell bodies.",
          },
        ],
        grade: {
          percentage: "66.67",
          grade: "D",
        },
      };

      expect(
        await questionsController.answer(payload as AnswersDTO)
      ).toStrictEqual(expectedAnswer);
    });
  });
});
