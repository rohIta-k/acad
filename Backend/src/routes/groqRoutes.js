const { Router } = require("express");

const router = Router();
const { runCreativeAgent } = require("../services/groq/runCreativeAgent");

router.post("/generateprompt", async (req, res) => {
    try {
        const { idea, format, platform, duration, include, brandData } = req.body;

        const result =
            await runCreativeAgent({ idea, format, platform, duration, include, brandData });

        return res.json(result);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            error:
                "Failed to generate cinematic plan",
        });
    }
},
);

module.exports=router;
