type Message = { pollOptionId: string; votes: number }
type Subcriber = (message: Message) => void

class VotingPubSub {
  private channels: Record<string, Subcriber[]> = {}
  subscribe(pollId: string, subcriber: Subcriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = []
    }
    this.channels[pollId].push(subcriber)
  }

  publish(pollId: string, message: Message) {
    if (!this.channels[pollId]) {
      return
    }
    for (const subiscriber of this.channels[pollId]) {
      subiscriber(message)
    }
  }
}

export const voting = new VotingPubSub()
