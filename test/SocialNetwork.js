const SocialNetwork = artifacts.require('./SocialNetwork.sol')

require('chai').use(require('chai-as-promised')).should()

contract('SocialNetwork', ([deployer, author, tipper])=> {
  let socialNetwork

  before(async()=> {
    socialNetwork = await SocialNetwork.deployed()
  })

  describe('deployed', async () => {
    it('deploys successfully', async ()=> {
      const address = await socialNetwork.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name =await socialNetwork.name()
      assert.equal(name, 'Freetroit Social Network')
    })
  })
   describe('posts', async () => {
     let result, postCount

     before(async () => {
       result = await socialNetwork.createPost('This is my first post', { from: author })
       postCount = await socialNetwork.postCount()
     })

     it('creates posts', async () => {
       //SUCCESS
       assert.equal(postCount, 1)
       const event = result.logs[0].args
       assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
       assert.equal(event.content, 'This is my first post', 'content is correct')
       assert.equal(event.tipAmount, '0', 'tip amount is correct')
       assert.equal(event.author, author, 'author is correct')

       // FAILURE: Post must have _content
       await socialNetwork.createPost('', { from: author, value: ether }).should.be.rejected;
     })

     it('lists posts', async ()=> {
       const post = await socialNetwork.posts(postCount)
       assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct')
       assert.equal(post.content, 'This is my first post', 'content is correct')
       assert.equal(post.tipAmount, '0', 'tip amount is correct')
       assert.equal(post.author, author, 'author is correct')

     })

     it('allows users to tip posts', async ()=> {

     })

   })
