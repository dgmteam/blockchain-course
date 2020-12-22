const Block = require('./block')

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()]
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1]
    const block = Block.mineBlock(lastBlock, data)
    this.chain.push(block)
    return block
  }

  isValid(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false
    }
    for (let i=1; i<chain.length; i++) {
      const block = chain[i]
      const lastBlock = chain[i-1]
      if (block.lastHash !== lastBlock.hash) {
        return false
      }
    }
    return true
  }

  replace(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log('New chain must be longer than current chain')
      return
    }

    if (!this.isValid(newChain)) {
      console.log('New chain is invalid')
      return
    }

    console.log('Replace with new chain')
    this.chain = newChain
  }
}

module.exports = Blockchain
