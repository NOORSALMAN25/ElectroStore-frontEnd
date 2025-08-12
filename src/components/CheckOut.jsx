import Payment from '../components/Payment'
const CheckOut = () => {
  return (
    <div>
      <form>
        <div>
          <h2>Payment</h2>
          <input type="radio" id="cash" name="payment" value="Cash" required />
          <label for="cash">Cash</label>
        </div>
        <h2> Address : </h2>
        <div>
          <label htmlFor="building">Building No:</label>
          <input name="building" type="text" placeholder="Building Number" />
        </div>
        <div>
          <label htmlFor="road">Roud No:</label>
          <input name="road" type="text" placeholder="Road Number" />
        </div>
        <div>
          <label htmlFor="block">Block No:</label>
          <input name="block" type="text" placeholder="Block Number" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CheckOut
