import express from "express";
import mongoose from "mongoose";
import db from "./db.js";
import Acronym from "../models/acronym.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/acronym", async (req, res) => {
  // Parse users limit input to an integer and if not given default value: 10
  //Parse users page input to an integer and if not given then default value: 1
  //Set the users search input to a regex expression to grab records that a similar and if not given then default value: *
  const limit = parseInt(req.query.limit || "10");
  const page = parseInt(req.query.page || "1");
  const search = req.query.search
    ? new RegExp(`.*${req.query.search}.*`)
    : new RegExp(".*");

  //Counts the documents/records that are associated with the users search, Gets the results for users search
  const countPromise = Acronym.countDocuments(search).exec();
  const resultsPromise = Acronym.find({ acronym: search })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  try {
    // Creates total count of documents list and a results list of the acronyms
    const [total, results] = await Promise.all([countPromise, resultsPromise]);

    // Gets the current count of the results list, Proceeds with next page, Checks whether there needs to be a next page or not
    const currentCount = results.length;
    const nextPage = page + 1;
    const hasNextPage = total > page * limit;

    //Sets the headers to the total amount of acronyms and the current amount of acronyms corresponding to the users limit input
    res.set("X-Total-Count", total);
    res.set("X-Current-Count", currentCount);

    // if there is a next page then provides the URL to the next page
    if (hasNextPage) {
      const nextURL = `${req.protocol}://${req.get("host")}${req.baseUrl}${
        req.path
      }?page=${nextPage}&limit=${limit}&search=${search}`;

      res.set("X-Next-Page", nextURL);
    }

    res.json(results);
  } catch (error) {
    //Set status to bad request and output error
    res.status(500).json({ message: error.message });
  }
});

app.post("/acronym", async (req, res) => {
  try {
    // Creates the new acronym document that needs to be added
    const acronym = new Acronym({
      acronym: req.body.acronym,
      definition: req.body.definition,
    });

    //Saves the acronym to the mongoDB
    const newAcronym = await acronym.save();

    //Set status to created and show new acronym
    res.status(201).json(newAcronym);
  } catch (error) {
    //Set status to bad request and output error
    res.status(400).json({ message: error.message });
  }
});

app.patch("/acronym/:acronymID", async (req, res) => {
  //Get user inputs acronymID and grab the users information they want to update
  const id = req.params.acronymID;
  const update = req.body;

  try {
    //find acronym by id and proceed to update it and set it to the new acronym info
    const updatedAcronym = await Acronym.findByIdAndUpdate(id, update, {
      new: true,
    });

    res.json(updatedAcronym);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/acronym/:acronymID", async (req, res) => {
  //Get user inputs acronymID and grab the users information they want to remove
  const id = req.params.acronymID;

  try {
    //find acronym by id and proceed to delete it
    const deletedAcronym = await Acronym.findByIdAndDelete(id);

    //if acronym is not within the database then send a not found status
    if (!deletedAcronym) {
      res.status(404).send(`Acronym with ID: ${id} was not found.`);
    } else {
      res.send(`The acronym with ID: ${id} was deleted.`);
    }
  } catch (error) {
    //Set status to bad request and output error
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
