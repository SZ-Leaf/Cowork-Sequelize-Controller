const mockCoworkings = require('../db/mock-coworkings')

exports.findAllCoworkings = (req, res) => {
      const criterium = req.query.criterium ? req.query.criterium : 'superficy'
      const orderBy = req.query.orderBy || 'ASC'
      const arrToSort = [...mockCoworkings];
      const nosort = req.query.nosort

      if (!nosort && (orderBy === 'ASC' || orderBy === 'DESC') && (criterium === 'superficy' || criterium === 'capacity')) {

          arrToSort.sort((a, b) => {
              return orderBy === 'DESC' ? b[criterium] - a[criterium] : a[criterium] - b[criterium]
          })
      }

      res.json({ message: 'La liste des coworkings a bien été récupérée.', data: arrToSort })
  }

exports.findCoworkingbyPK = () => {}
exports.createCoworking = () => {}
exports.updateCoworking = () => {}
exports.deleteCoworking = () => {}