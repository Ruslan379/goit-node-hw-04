//? +++++++++++++++++++  mongoose +++++++++++++++++++
const { NotFound } = require('http-errors')
const { Contact } = require("../../models");

const { lineBreak } = require("../../services");

//-----------------------------------------------------------------------------
const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    // const contact = await Contact.findOne({ _id: contactId }); //! 1-ый вариант
    // const contact = await Contact.findById(contactId); //! 2-ой вариант

    const { _id: user_id } = req.user //?
    //* =============================console===================================
    console.log("getContactById-->req.user:".bgYellow.red); //?
    console.table(req.user); //?
    console.table([req.user]);

    console.log("getContactById-->user_id:".bgYellow.blue, user_id); //?
    console.log("");
    //* =======================================================================


    //! ===========================console============================
    console.log("START-->GET/:id".blue); //!
    lineBreak();
    //! ==============================================================


    const contact = await Contact.findOne({ _id: contactId, userId: user_id }); //! 1-ый вариант


    if (!contact) {
        //! ===========================console============================
        console.log("Нет ПОЛЬЗОВАТЕЛЯ с таким ID:".yellow, contactId.red); //!
        lineBreak();
        console.log("END-->GET/:id".blue); //!
        //! ==============================================================
        throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }


    //! ===========================console============================
    console.log(`ПОЛЬЗОВАТЕЛЬ с ID: ${contactId}:`.bgBlue.yellow); //!
    // console.table([contact]); //!
    console.log(contact); //!
    lineBreak();
    console.log("END-->GET/:id".blue); //!
    lineBreak();
    //! ==============================================================


    res.status(200).json({
        status: "success",
        code: 200,
        data: { contact }
    })
};

module.exports = getContactById;
//? _____________________  mongoose _____________________




//todo --> OLD ------------------------------------
// const { NotFound } = require('http-errors')

// const contactsOperations = require("../../models/contacts")

// //-----------------------------------------------------------------------------
// const getContactById = async (req, res, next) => {
//     const { contactId } = req.params;
//     const contact = await contactsOperations.getContactById(contactId)

//     if (!contact) {
//         throw new NotFound(`Contact wiht id:'${contactId}' not found`)
//     }

//     res.status(200).json({
//         status: "success",
//         code: 200,
//         data: { contact }
//     })
// }

// module.exports = getContactById