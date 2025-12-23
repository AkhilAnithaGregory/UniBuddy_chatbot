import mongoose from 'mongoose';

const dailyCheckInSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    checkInUTC: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt
  }
);

dailyCheckInSchema.index({ userId: 1, checkInUTC: -1 });

const DailyCheckIn = mongoose.model('DailyCheckIn', dailyCheckInSchema);

export default DailyCheckIn;