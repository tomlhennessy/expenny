import { subscriptions } from "@/utils"


export default function SubscriptionsDisplay() {
    return (
      <section>
        <h2>Your Subcriptions</h2>
        <div className='card-container'>
          {subscriptions.map((sub, subIndex) => {
            const { name, category, cost, currency, billingFrequency, startDate, notes, status } = sub

            return (
              <div key={subIndex} className='card subcription-card'>
                <div>
                  <h3>{name}</h3>
                  <div className={'status ' + (status === 'Active' ? 'card-button-primary' : 'card-button-secondary')}>
                    <small>{status}</small>
                  </div>
                </div>

                <p><i>{category}</i></p>

                <div className='sub-cost'>
                  <h2>${cost}</h2>
                  <p>{currency}</p>
                </div>

                <small>per {billingFrequency}</small>

              </div>

            )
          })}
        </div>
      </section>
    )
  }
