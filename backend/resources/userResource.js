
const returnSpeakerWithEvents = (res,speaker) => {
    res.status(200).json({
      _id: speaker._id,
      name: speaker.name,
      email: speaker.email,
      type: speaker.type,
      imageUrl: speaker.imageUrl,
      description: speaker.description,
      linkedin: speaker.linkedin,
      twitter: speaker.twitter,
      website: speaker.website,
      company: speaker.company,
      position: speaker.position,
      events: speaker.events,
    });
    return;
  };
  const checkReturnUser = (res,user) => {
    if (user.type === "user" || user.type === "admin") {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
      });
      return;
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      type: user.type,
      imageUrl: user.imageUrl,
      description: user.description,
      linkedin: user.linkedin,
      twitter: user.twitter,
      website: user.website,
      company: user.company,
      position: user.position,
    });
    return;
  };
  
  const returnUser = (res,user) => {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      type: user.type,
    });
    return;
  };
  
  const returnSpeaker = (res,speaker) => {
    res.status(200).json({
      _id: speaker._id,
      name: speaker.name,
      email: speaker.email,
      type: speaker.type,
      imageUrl: speaker.imageUrl,
      description: speaker.description,
      linkedin: speaker.linkedin,
      twitter: speaker.twitter,
      website: speaker.website,
      company: speaker.company,
      position: speaker.position,
      // stripeAccountId:speaker.stripeAccountId,
    });
    return;
  };
export {
    returnSpeakerWithEvents,returnSpeaker,returnUser,checkReturnUser,}