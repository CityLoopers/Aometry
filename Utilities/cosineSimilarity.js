const tf = require('@tensorflow/tfjs-node')

function cosineSimilarity (vecA, vecB) {
  if (vecA.shape[0] !== vecB.shape[0]) {
    throw new Error('Vectors must have the same length')
  }
  const dotProduct = tf.dot(vecA, vecB)
  const magnitudeA = tf.norm(vecA)
  const magnitudeB = tf.norm(vecB)
  return dotProduct.div(magnitudeA.mul(magnitudeB)).dataSync()[0]
}

module.exports = { cosineSimilarity }
