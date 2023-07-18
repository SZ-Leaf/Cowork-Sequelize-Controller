const express = require('express')
const router = express.Router()
const mockCoworkings = require('../db/mock-coworkings')
const coworkingController = require('../controllers/coworkingController')

router
    .route('/')
    .get(coworkingController.findAllCoworkings)
    
    .post((req, res) => {
        // on ajoute à un nouvel objet {} un id unique, en l'occurrence égal au dernier id du mock-coworkings auquel on ajoute 1
        const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
        const newCoworking = { id: newId, ...req.body }
        mockCoworkings.push(newCoworking)
        return res.json({ message: `Un nouveau coworking n°${newCoworking.id} a été créé.`, data: newCoworking })
    })

router
    .route('/:id')
    .get((req, res) => {
        let targetCoworking = mockCoworkings.find(el => el.id === parseInt(req.params.id))

        if (targetCoworking) {
            return res.json({ message: `L'élément ayant pour id ${targetCoworking.id} a bien été récupéré.`, data: targetCoworking })
        } else {
            return res.json({ message: `L'élément ayant pour id ${req.params.id} n'a pas pu être récupéré.` })
        }
    })
    .put((req, res) => {
        const indexInArray = mockCoworkings.findIndex((element) => {
            return element.id === parseInt(req.params.id)
        })

        if (indexInArray === -1) {
            return res.json({ message: `Le coworking ${req.params.id} n'existe pas.` })
        } else {
            let updatedCoworking = { ...mockCoworkings[indexInArray], ...req.body }
            mockCoworkings[indexInArray] = updatedCoworking;

            return res.json({ message: `Le coworking ${updatedCoworking.name} a été modifié`, data: updatedCoworking })
        }
    })
    .delete((req, res) => {
        const indexInArray = mockCoworkings.findIndex((element) => {
            return element.id === parseInt(req.params.id)
        })

        if (indexInArray === - 1) {
            return res.json({ message: `L'id ${req.params.id} ne correspond à aucun élément.` })
        } else {
            const deletedeCoworkings = mockCoworkings.splice(indexInArray, 1)
            return res.json({ message: `L'élément id ${req.params.id} a bien été supprimé`, data: deletedeCoworkings[0] })
        }
    })

module.exports = router