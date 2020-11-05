'use strict'
import Periodicity from '../config/periodicityConfig'

export default [
  {
    limit: 10,
    percentageLimit: 0.4,
    criteriaId: 1,
    periodicityId: Periodicity.WEEKLY,
    action: 'Reward',
    description: 'Send a reward to a bank teller'
  },
  {
    limit: 10,
    percentageLimit: 0.8,
    criteriaId: 3,
    periodicityId: Periodicity.WEEKLY,
    action: 'Compliment',
    description: 'Send a compliment to a bank teller'

  },
  {
    limit: 12,
    percentageLimit: 0.3,
    criteriaId: 3,
    periodicityId: Periodicity.WEEKLY,
    action: 'Do nothing',
    description: 'No action for the bank teller'
  },
  {
    limit: 13,
    percentageLimit: 0.4,
    criteriaId: 3,
    periodicityId: Periodicity.WEEKLY,
    action: 'Notify the bank teller',
    description: 'Notify the user to behave better'
  },
  {
    limit: 14,
    percentageLimit: 0.45,
    criteriaId: 3,
    periodicityId: Periodicity.WEEKLY,
    action: 'Send behavior guideline'
  },
  {
    limit: 15,
    percentageLimit: 0.3,
    criteriaId: 3,
    periodicityId: Periodicity.WEEKLY,
    action: 'Create a suspension'
  },
  {
    limit: 1,
    percentageLimit: 0.05,
    criteriaId: 8,
    periodicityId: Periodicity.WEEKLY,
    action: 'Suggest to see professionals'
  },

  {
    limit: 10,
    percentageLimit: 0.4,
    criteriaId: 1,
    periodicityId: Periodicity.MONTHLY,
    action: 'Reward'
  },
  {
    limit: 10,
    percentageLimit: 0.8,
    criteriaId: 3,
    periodicityId: Periodicity.MONTHLY,
    action: 'Compliment'
  },
  {
    limit: 12,
    percentageLimit: 0.3,
    criteriaId: 3,
    periodicityId: Periodicity.MONTHLY,
    action: 'Do nothing'
  },
  {
    limit: 13,
    percentageLimit: 0.4,
    criteriaId: 3,
    periodicityId: Periodicity.MONTHLY,
    action: 'Notify the bank teller'
  },
  {
    limit: 14,
    percentageLimit: 0.45,
    criteriaId: 3,
    periodicityId: Periodicity.MONTHLY,
    action: 'Send behavior guideline'
  },
  {
    limit: 15,
    percentageLimit: 0.3,
    criteriaId: 3,
    periodicityId: Periodicity.MONTHLY,
    action: 'Create a suspension'
  },
  {
    limit: 1,
    percentageLimit: 0.05,
    criteriaId: 8,
    periodicityId: Periodicity.MONTHLY,
    action: 'Suggest to see professionals'
  },

  {
    limit: 10,
    percentageLimit: 0.4,
    criteriaId: 1,
    periodicityId: Periodicity.YEARLY,
    action: 'Reward'
  },
  {
    limit: 10,
    percentageLimit: 0.8,
    criteriaId: 3,
    periodicityId: Periodicity.YEARLY,
    action: 'Compliment'
  },
  {
    limit: 12,
    percentageLimit: 0.3,
    criteriaId: 3,
    periodicityId: Periodicity.YEARLY,
    action: 'Do nothing'
  },
  {
    limit: 13,
    percentageLimit: 0.4,
    criteriaId: 3,
    periodicityId: Periodicity.YEARLY,
    action: 'Notify the bank teller'
  },
  {
    limit: 14,
    percentageLimit: 0.45,
    criteriaId: 3,
    periodicityId: Periodicity.YEARLY,
    action: 'Send behavior guideline'
  },
  {
    limit: 15,
    percentageLimit: 0.3,
    criteriaId: 3,
    periodicityId: Periodicity.YEARLY,
    action: 'Create a suspension'
  },
  {
    limit: 1,
    percentageLimit: 0.05,
    criteriaId: 8,
    periodicityId: Periodicity.YEARLY,
    action: 'Suggest to see professionals'
  },


]
