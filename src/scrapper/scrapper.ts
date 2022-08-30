import * as cheerio from 'cheerio'
import puppeteer from 'puppeteer'
import Config from '../config'

// Multiple bet companies exist so different scrapping patterns
// TODO: check this out https://www.sportybet.com/ng/lite/betslip?calculate=1
export async function sportyBetScapper(betCode: string): Promise<Object> {
    const games: Game[] = []
    const odds: Odds = {}
    let totalOdds: number = 1
    try {
      const browser = await puppeteer.launch({
        headless: false, args: ['--headless'] 
      })
      const page = await browser.newPage()
      await page.goto(Config.sportyBetCodeUrl)

      await page.type('.m-input.fs-exclude.data-hj-suppress', betCode) // '777B78') // '5402F96')//    
      await Promise.all([
        page.waitForNavigation(), // The promise resolves after navigation has finished
        page.click('.af-button.af-button'), // Clicking the link will indirectly cause a navigation
      ]);

      const data = await page.content()
      const $ = cheerio.load(data)
      let a = $('.m-bet-container').toArray()

      a.forEach(e => {
        const game: Game = {}
        const l = cheerio.load(e)
        const readOdds = l('.m-outcome-odds').text().replace(/\s+/g, '')
        const oddsVal: number | null = readOdds.length > 1 ? parseFloat(readOdds) : null

        game.pick = l('.m-icon-football').text()
        game.odds = oddsVal
        game.teams = l('.m-vs-wrapper').text()
        game.description = l('.m-desc').text().replace(/(\s+)/g, ' ') || l('.m-market-desc').text().replace(/(\s+)/g, ' ')
        game.isSuspended = l('.m-outcome-suspended').text() ? true : false
        
        if (game.odds) {
            totalOdds *= game.odds
        }

        games.push(game)       
      })

      odds.totalOdds = $('.total-odds').text()//.split(' ')[2] || null
      odds.maxBonus = $('.bonus').text()//.split(' ')[1] || null
      odds.potentialWin = $('.m-value').text()//.replace(/(\s+)/g, ' ') || null    
      await browser.close()
      return { provider: 'SportyBet', games, totalOdds: totalOdds.toFixed(2) }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
