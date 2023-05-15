const { Schema, model } = require('mongoose');

const CancellationPolicySchema = new Schema({


    // reservation: { type: Schema.Types.ObjectId, ref: 'Reservation', required: true },
    // cancelTime: { type: Date, required: true },
    // cancelFee: { type: Number, required: true },


    // property: { type: String, required: true },
    // policy: {
    //     noChargeBefore: { type: Number, required: true },
    //     chargePercentage: { type: Number, required: true },
    // },

    // policy: { type: String, required: true },
    // cancelationFeeStructure: [
    //     {
    //         hoursPriorToCheckIn: { type: Number, required: true },
    //         feePercentage: { type: Number, required: true },
    //     },
    // ],

});

module.exports = model("CancellationPolicy", CancellationPolicySchema);