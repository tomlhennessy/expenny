'use client'

export default function SubscriptionForm() {
    return (
        <section>
            <h2>Add a new subscription</h2>

            <form onSubmit={() => { }}>
                <label>
                    <span>Subscription Name</span>
                    <input type='text' name='name' placeholder='e.g. Netflix, Spotify' required />
                </label>

            </form>
        </section>
    )
}
