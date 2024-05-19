## deScalper

### Background

 - have you ever wanted to go to watch a concert of an artist that you have idolized and love
 - but you are being hold back, because the tickets already sold out, despite you start to purchase them at the designated launch time?
 - and then you check out later online, there are people start selling these tickets at exorbitant price?
 - this is issue is known as ticket scalping issue, and it is a serious social issue that we want to solve with our dapp
 - there are many news reported about this, some countries try to legitimate law to prevent this but with less effective, and the abuse is still widespread

 1. https://en.wikipedia.org/wiki/Ticket_resale
 2. https://brazilian.report/liveblog/politics-insider/2024/04/25/brazil-taylor-swift-act-ticket-scalping/
 3. https://asianews.network/scalpers-take-bigger-cut-of-korean-music-industry/
 4. https://techwireasia.com/08/2023/ticket-scalping-why-concert-tickets-are-always-out-of-reach/



### Problem

 1. loyal fans fail to get tickets
    - scalper tend to buy concert ticket at bulk from the official sites
    - usually deploying various members to get as much tickets as possible
    - this prevents the actual fan to obtain the ticket

 2. paying high price to scalper for tickets to desperate fans
    - scalper will resell the tickets at exorbitant price (usually 3 to 10x) to their customer

3. major revenue lost to artist
    - in US, ticket reselling (or scalper) issue has a value of 5 billion USD market in US and is still growing
    - these are the potential revenue lost to the artist and the loyal fans paying unnecessary fee for this

 4. reliability of ticket purchase sites
    - most of the ticket reservation site for popular artist will tend to crash when they start to launch, as they are huge influx of users trying to obtain them

5. non transparent of random ticket selling
    - some sites allow user to preregistered to get the tickets, and they will be randomly selected to get the ticket (example in Tokyo Olympics 2020, users are required to register to the pool, before randomly selected to get the ticket)
    - however, this randomness is non transparent

### Solution
 1. ticket as soul bound NFT
    - user will receive a soul bound NFT, after they make the ticket purchase
    - user cant transfer it to other user, and then can only redeem the NFT and at the entrace of the concert
    - once it is redeem, the NFT will be burned

 2. gather wallet activity before allowing user to purchase ticket
    - employ similar method used in Sepolia faucet testnet, that require user wallet to have a minimum amount, and activitiy before they are allowed to buy
    - this is to prevent scalper to create multiple wallet to buy the ticket

 3. deployment in blockchain for transparent and reliability
    - as the dapp will run in the blockchain, all the decision is transparent
    - the blockchain will run to eternity that solve the reliability issue of existing ticket system

 4. good user experience using stable coin as transaction
    - using zksync paymaster, that allow user to have good user experience, as they could use stable coin (USDT, USDC) to make the ticket purchase
    - the concert organizer could employ sponsored transaction to improve the UX
    - the fee to run in the blockchain will be much cheaper compare to existing credit card payment system

