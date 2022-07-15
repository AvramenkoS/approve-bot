const TelegaBot = require('node-telegram-bot-api')
const {Router} = require('express')
const router = Router()

const token = '5525803917:AAFTNzmwAlQo0lCBe4oHdX0sZnlNfOq3DK8'
const chatIdGroup = -710304638

const bot = new TelegaBot(token, {polling: true})

const approveOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Approve Deal', callback_data: 'true'}]
        ]
    })
}

router.post('/send', async (req, res) => {
    try {
        const {order, symbol1, sum1, symbol2, network2, sum2, wallet} = req.body

        bot.on('message', msg => {
            bot.sendMessage(chatIdGroup, `Approve Deal`, approveOptions)
        })

        bot.on('callback_query', async msg => {
            const data = msg.data
            const chatId = msg.message.chat.id

            bot.sendMessage(chatIdGroup, JSON.stringify({data, chatId}))

            if (msg.data === 'true') res.status(201).json({message: 'Success', order, symbol1, sum1, symbol2, network2, sum2, wallet})
        })

    } catch (e) {
        res.status(500).json({message: 'Some Error'})
    }
})

module.exports = router