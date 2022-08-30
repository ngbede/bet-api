# bet-api
REST API to extract betting slip info from various betting providers using the booking code.

## How to use
Below is guide on how to use the api, it returns a json response which contains the bet info in a listed booking code from a betting site.

### Listed providers
- [x] `sportybet` <br>

**TODO's**
- [ ] Bet9ja
- [ ] BetKing
- [ ] NairaBet
- [ ] BetFarm
- [ ] Winners Golden Bet

### Endpoints
- `betpro/bet-slip/:code?provider={listed-provider}`<br>
required query params
**provider**

### Sample Response body
`http://localhost:4001/betpro/bet-slip/009BE4F2?provider=sportybet`
```JSON
{
    "provider": "SportyBet",
    "games": [
        {
            "pick": "Yes",
            "odds": 1.2,
            "teams": " Marseille vs Clermont Foot 63",
            "description": " Home Team to Win Either Half ",
            "isSuspended": false
        },
        {
            "pick": "Over 1.5",
            "odds": 1.15,
            "teams": " New York City FC vs DC United",
            "description": " Over/Under ",
            "isSuspended": false
        },
        {
            "pick": "Over 1.5",
            "odds": 1.16,
            "teams": " Liverpool vs Newcastle",
            "description": " Over/Under ",
            "isSuspended": false
        }
    ],
    "totalOdds": "2.07"
}

```
