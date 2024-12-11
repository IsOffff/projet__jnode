const { z } = require('zod');

const emargementSchema = z.object({
  session_id: z.number().positive(),
  etudiant_id: z.number().positive(),
  status: z.boolean().default(true)
});

module.exports = { emargementSchema };