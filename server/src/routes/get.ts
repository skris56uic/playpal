import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", async (req, res) => {
	const overpassUrl = "http://overpass-api.de/api/interpreter";

	const overpassQuery = `
    [out:json][timeout:180];
    area[name = "Illinois"];
    nwr(area)["sport"~".*\\s*base\\s*ball\\s*.*",i];
    out geom;
  `;

	try {
		// Send the query to the Overpass API

		const request = new Request(overpassUrl, {
			method: "POST",
			body: overpassQuery,
		});

		const response = await fetch(request);
		const data = await response.json();

		res.send(data);

		// Return the data from the Overpass API
	} catch (error) {
		console.error("Error fetching data from Overpass API:", error);
		res.status(500).json({ error: "Error fetching data from Overpass API" });
	}
});

export default router;
