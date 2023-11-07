import dotenv from "dotenv";
dotenv.config();

const XATA_API_KEY = process.env.XATA_API_KEY;
const XATA_DB_BASE_URI = process.env.XATA_DB_BASE_URI;

const _option = {
  headers: {
    Authorization: `Bearer ${XATA_API_KEY}`, 
    'Content-Type': 'application/json'
  },
}

export const handleAddJob = async (req, res) => {
  const job = req.body;

  const options = {
    method: 'POST',
    ..._option,
    body: JSON.stringify({
      website: job.website,
      position: job.position,
      date_applied: job['date-applied'],
      status: job.status,
      source: job.source,
      notes: job.notes,
    })
  };
  
  fetch(XATA_DB_BASE_URI + '/data?columns=id', options)
    .then(response => {
      if (response.ok) {
        res.sendStatus(200);
      }
    })
    .then(response => console.log(response))
    .catch(err => console.error(err));
};

export const handleListJobs = async (req, res) => {
  const options = {
    method: 'POST',
    ..._option,
    body: JSON.stringify({
      columns: [
        "id",
        "website",
        "position",
        "date_applied",
        "status",
        "notes",
        "source"
      ],
      page: {
        size: 50
      }
    })
  };

  fetch(XATA_DB_BASE_URI + '/query', options)
    .then(response => response.json())
    .then(response => res.json(response.records))
    .catch(err => console.error(err));
}

export const handleListSingleJob = async (req, res) => {
  const options = {
    method: 'GET',
    ..._option,
  };

  console.log(req.params.id);

  fetch(XATA_DB_BASE_URI + `/data/${req.params.id}`, options)
    .then(response => response.json())
    .then(response => res.json(response))
    .catch(err => console.error(err));
}

