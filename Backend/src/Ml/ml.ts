import fs from "fs";
import csv from "csv-parser";
const tf = require("@tensorflow/tfjs-node");
import path from "path";

const trainModel = () => {
  // Step 1: Read and preprocess the data from the CSV file
  const symptoms: any = [];
  const labels: any = [];

  fs.createReadStream(path.join(__dirname, "./data.csv"))
    .pipe(csv())
    .on("data", (row) => {
      const symptomVector = [
        row.Symptom1,
        row.Symptom2,
        row.Symptom3,
        row.Symptom4,
      ];
      symptoms.push(symptomVector);
      labels.push(row.Disease);
    })
    .on("end", () => {
      // Step 2: Preprocess the data
      const uniqueSymptoms = [...new Set(symptoms.flat())];
      const encodedSymptoms = symptoms.map((symptomVector: any) =>
        symptomVector.map((symptom: any) => uniqueSymptoms.indexOf(symptom))
      );

      // Step 3: Train the model
      const model = tf.sequential();
      model.add(
        tf.layers.dense({ inputShape: [4], units: 16, activation: "relu" })
      );
      model.add(
        tf.layers.dense({ units: labels.length, activation: "softmax" })
      );
      model.compile({ optimizer: "adam", loss: "categoricalCrossentropy" });

      const xs = tf.tensor2d(encodedSymptoms);
      const labelIndices = labels.map((label: any) =>
        labels.indexOf(labels.toString())
      );
      const ys = tf.oneHot(labelIndices, labels.length);

      model
        .fit(xs, ys, { epochs: 100 })
        .then(() => {
          // Step 4: Save the model to disk
          const modelPath = path.join(__dirname, "saved-model");
          model
            .save(`file://${modelPath}`)
            .then(() => {
              console.log("Model trained and saved");

              // Step 5: Use the saved model for prediction
              const testSymptoms = ["Rash", "Itching", "Sneezing", "Watery"];
              const encodedTestSymptoms = testSymptoms.map((symptom) =>
                uniqueSymptoms.indexOf(symptom)
              );
              const input = tf.tensor2d([encodedTestSymptoms], [1, 4]);

              tf.loadLayersModel(`file://${modelPath}/model.json`)
                .then((loadedModel: any) => {
                  const prediction = loadedModel.predict(input);
                  const predictedDiseaseIndex = tf
                    .argMax(prediction)
                    .dataSync()[0];
                  const predictedDisease = labels[predictedDiseaseIndex];

                  console.log("Predicted Disease:", predictedDisease);
                })
                .catch((error: Error) => {
                  console.error("Error loading saved model:", error);
                });
            })
            .catch((error: Error) => {
              console.error("Error saving model:", error);
            });
        })
        .catch((error: Error) => {
          console.error("Error training model:", error);
        });
    });
};

// trainModel()
