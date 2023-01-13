require('dotenv').config({ path: '.env.local' })
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')(process.env.STRIPE_KEY);
// console.log(process.env)

// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = process.env.ENDPOINT_SECRET;

// Using Express
const app = require('express')();
const express = require('express')
const PocketBase = require('pocketbase/cjs')

const pb = new PocketBase(process.env.PB_URL);

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');

const fulfillOrder = (lineItems, metadata) => {
    // TODO: fill me in
    console.log("Fulfilling order", lineItems);
    // console.log(metadata.course_id);
    enrolling(metadata);

}

const enrolling = async (metadata) => {
    const record = await pb.collection('courses').getOne(metadata.course_id || "", {
        expand: 'instructor,student',
    });
    var newStudentArray = record.student || []
    newStudentArray.push(metadata.user_id)

    var sendData = {
        "id": record.id,
        "name": record.name,
        "instructor": record.instructor,
        "thumbnail": record.thumbnail || "",
        "description": record.description || "",
        "student": newStudentArray,
    };

    try {
        const newRecord = await pb.collection('courses').update(metadata.course_id || "", sendData)
        console.log(newRecord)
    }
    catch {
        console.log('error')
    }
}


var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (request, response) => {
    const payload = request.body;
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            {
                expand: ['line_items'],
            },
        );
        const sessionMetadata = await stripe.checkout.sessions.retrieve(
            event.data.object.id
        );
        const lineItems = sessionWithLineItems.line_items;
        const metadata = sessionMetadata.metadata
        // Fulfill the purchase...
        fulfillOrder(lineItems, metadata);
    }

    response.status(200).end();
});

app.use(allowCrossDomain, express.json())

app.post('/create-checkout-session', async (req, res) => {
    const record = await pb.collection('courses').getOne(req.query.course || "", {
        expand: 'instructor,student,announcement,material,video,tag,assignment',
    })
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'thb',
                    product_data: {
                        name: record.name,
                    },
                    unit_amount: Number(record.price) * 100,
                },
                quantity: 1,
            },
        ],
        metadata: { course_id: req.query.course, user_id: req.query.user },
        mode: 'payment',
        success_url: 'https://hack2school.jjus.dev' + '/courses/'+ req.query.course,
    });

    res.redirect(303, session.url);
});


app.get('/', async (req, res) => {
    const record = await pb.collection('courses').getOne("g8ihlv62o5c2ept" || "", {
        expand: 'instructor,student,announcement,material,video,tag,assignment',
    })
    console.log(record)
    console.log(typeof(record))
    console.log(Object.keys(record))
    console.log(record.name)
    res.json(req.body)
});


app.get('/success', (req, res) => {
    res.redirect('https://127.0.0.1:3000/payment');
});

app.listen(4242, () => console.log('Running on port 4242'));