import asyncHandler from "../middleware/asyncHandler.js";
import Event from "../models/eventModel.js";
import Stripe from "stripe";
import Order from "../models/orderModel.js";
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
import pdfMake from "pdfmake/build/pdfmake.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// checkout with stripe
// POST /api/events/:id/checkout
// private
const checkout = asyncHandler(async (req, res) => {
  const stripePayment = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { id: eventId } = req.params;
  const event = await Event.findById(eventId);
  if (event) {
    const order = await Order.create({
      user: req.user._id,
      event: eventId,
      totalPrice: event.ticket_price,
    });
    if (!order) {
      res.status(400);
      throw new Error("something is wrong");
    }

    const session = await stripePayment.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Ticket for " + event.name,
              // images: ["https://i.ibb.co/0s3pdnc/Logo.png"],
            },
            unit_amount: Math.round(event.ticket_price * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        order_id: order._id.toString(),
      },
      success_url: `${process.env.WEBSITE_URL}/event/${eventId}?success=true`,
      cancel_url: `${process.env.WEBSITE_URL}/event/${eventId}?canceled=true`,
    });
    res.json({ url: session.url });
    return;
  }
  res.status(404);
  throw new Error("Event not found");
});

// update order to paid
// POST /api/orders/updateOrder
// private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // const sig = req.headers["stripe-signature"];
  // let event = req.body;

  // // Handle the checkout.session.completed event
  // if (event.type === "checkout.session.completed") {
  //   const session = event.data.object;
  //   const order_id = session.metadata.order_id;
  //   const order = await Order.findById(order_id);
  //   if (order) {
  //     const event = await Event.findById(order.event);
  //     event.ticket_remaining = event.ticket_remaining - 1;
  //     await event.save();
  //     const email = session.customer_details.email;
  //     const { id, status } = session;
  //     if (order) {
  //       order.isPaid = true;
  //       order.paidAt = Date.now();
  //       order.paymentResult = {
  //         id: id,
  //         status: status,
  //         update_time: Date.now(),
  //         email_address: email,
  //       };
  //       const updatedOrder = await order.save();
  //       console.log(updatedOrder);
  //     }
  //   }
  // }
  const sig = req.headers["stripe-signature"];
  let event = req.body;
  console.log("------------------ hear");

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const order_id = session.metadata.order_id;
    const order = await Order.findById(order_id);
    if (order) {
      const event = await Event.findById(order.event);
      event.ticket_remaining = event.ticket_remaining - 1;
      await event.save();
      const email = session.customer_details.email;
      const { id, status } = session;
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: id,
          status: status,
          update_time: Date.now(),
          email_address: email,
        };
        const updatedOrder = await order.save();
        console.log(updatedOrder);
      }
    }
  }
});

// get user orders
// GET /api/orders/myorders
// private
const getUserOrders = asyncHandler(async (req, res) => {
  // populate event and se;ect only the fields we want
  const orders = await Order.find({ user: req.user._id }).populate(
    "event",
    "name image date"
  );
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

const downloadTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate({
    path: "event",
    populate: {
      path: "speaker",
      select: "name",
    },
  });
  if (order) {
    const docDefinition = {
      content: [
        { text: "Event Name: " + order.event.name, fontSize: 14 },
        { text: "Date: " + order.event.date, fontSize: 14 },
        { text: "Address: " + order.event.address, fontSize: 14 },
        { text: "Attendent: " + req.user.name, fontSize: 14 },
        { text: "Speaker: " + order.event.speaker.name, fontSize: 14 },
        // add more content as needed
      ],
      defaultStyle: {
        color: "#FFFFFF",
        background: "#800080",
      },
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    res.download(pdfDoc,'ticket.pdf');
    // pdfDoc.getBuffer((buffer) => {
    //   res.setHeader('Content-Type', 'application/pdf');
    //   res.setHeader('Content-disposition', 'attachment;filename=ticket.pdf');
    //   res.setHeader('Content-Length', Buffer.byteLength(buffer));
    //   res.download(buffer,'ticket.pdf');
    // });

  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export { checkout, updateOrderToPaid, getUserOrders,downloadTicket };
