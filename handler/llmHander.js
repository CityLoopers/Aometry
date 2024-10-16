const fs = require('fs')
const path = require('path')
const tf = require('@tensorflow/tfjs-node')
const toxicity = require('@tensorflow-models/toxicity')
const use = require('@tensorflow-models/universal-sentence-encoder')
const { cosineSimilarity } = require('../Utilities/cosineSimilarity')

const qaData = require('../LLM/qaData.json')

const TOXICITY_RESPONSES = require('../LLM/toxicityResponses.json')

const mdFilePath = path.join(__dirname, '..', 'LLM', 'prompt.md')
let prompt = ''

fs.readFile(mdFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  prompt = data
})

async function loadToxicityModel () {
  return await toxicity.load(0.9)
}
const toxicityModelPromise = loadToxicityModel()

async function classifyToxicity (text) {
  const model = await toxicityModelPromise
  if (!model) throw new Error('Model not loaded')

  const predictions = await model.classify(text)
  return predictions
}

async function loadUseModel () {
  return await use.load()
}

const useModelPromise = loadUseModel()

async function encodeQuestions () {
  const model = await useModelPromise
  const questionEmbeddings = []
  for (const qa of qaData) {
    const embedding = await model.embed(qa.question)
    const reshapedEmbedding = tf.reshape(embedding, [512])
    questionEmbeddings.push(reshapedEmbedding)
  }
  return questionEmbeddings
}

let questionEmbeddings
encodeQuestions().then(embeddings => {
  questionEmbeddings = embeddings
})

async function classifyQuestion (question) {
  const model = await useModelPromise
  const questionEmbedding = await model.embed(question)
  const reshapedQuestionEmbedding = tf.reshape(questionEmbedding, [512])

  let maxSimilarity = -1
  let bestMatchIndex = -1

  for (let i = 0; i < questionEmbeddings.length; i++) {
    const similarity = cosineSimilarity(reshapedQuestionEmbedding, questionEmbeddings[i])
    if (similarity > maxSimilarity) {
      maxSimilarity = similarity
      bestMatchIndex = i
    }
  }

  if (maxSimilarity >= 0.8) {
    return qaData[bestMatchIndex].answer
  } else {
    return null
  }
}

module.exports = {
  classifyToxicity,
  TOXICITY_RESPONSES,
  classifyQuestion
}
