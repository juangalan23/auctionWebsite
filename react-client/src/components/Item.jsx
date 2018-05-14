import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import NumericInput from 'react-numeric-input';
const formatUSD = require('format-usd');


const styles = theme => ({
  card: {
    maxWidth: 600,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', 
  },
  actions: {
    display: 'flex',
  }
});

class ItemCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expiringTime: '',
            timeLeft: 'calculating time',
            bidAmount: ''
        }
        this.timerTick = this.timerTick.bind(this);
        this.handleBidChange = this.handleBidChange.bind(this);
        this.handleBidSubmit = this.handleBidSubmit.bind(this);
    }

  static getDerivedStateFromProps(nextProps, prevState) {
      if(nextProps.item.expiringTime !== prevState.expiringTime) {
          return {
              expiringTime: nextProps.item.expiringTime
          }
      }
      return null
  }
  componentDidMount() {
      this.timer = setInterval( 
          ()=> this.timerTick(), 1000
        )
  }
  timerTick () {
      if( typeof(this.state.timeLeft) !== 'calculating time' ) {
        if (new Date(this.state.expiringTime).getTime() -  new Date().getTime() < 0 ) {
            this.setState({
                timeLeft: false
            },()=>{
                if (this.props.item.soldTo === '' && this.props.item.latest_bidder ) {
                    this.props.updateSoldItem(this.props.item._id, this.props.item.latest_bidder_id, this.props.item.latest_bidder)
                }
            })
        } else {
            this.setState({
                timeLeft: moment.duration(new Date(this.state.expiringTime).getTime() -  new Date().getTime(), 'milliseconds').humanize()
            })
        }
        
      }
  }
  handleBidChange (e) {
      this.setState({
          bidAmount: Number(e.target.value)
      })
  }

  handleBidSubmit(e) {
      e.preventDefault()
      if( typeof(this.state.bidAmount) !== 'number') {
          alert('Bid must be a valid number!')
      } else if( this.state.bidAmount <= this.props.item.starting_price 
            || this.state.bidAmount <=this.props.item.latest_bid) {
                alert('Bid must be higher than the current highest bid or starting price!')
        }
        else {
            const newBid = {
                user_id: this.props.userInfo._id,
                user_name: this.props.userInfo.username,
                bid_price: this.state.bidAmount,
                item_id: this.props.item._id
            }
            this.props.submitNewBid(newBid) 
            this.setState({
                bidAmount: ''
            })
        }
  }
  

  render() {
    const { classes, item } = this.props;
    const { timeLeft, bidAmount} = this.state;
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            title={item.name}
            subheader={ timeLeft ?  `expires in: ${ timeLeft } ` : 'EXPIRED'}
          />

          <CardMedia
            className={classes.media}
            image={item.image_url}
          />

          <CardContent>
            <Typography variant='title'>
              {`starting price: ${formatUSD({amount: item.starting_price, decimalPlaces:0})}`}
            </Typography>

            <Typography variant='title'>
              {item.latest_bid ? `current bid: ${formatUSD({amount: item.latest_bid, decimalPlaces:0})} by ${item.latest_bidder}` : 'no bids yet!'}
            </Typography>

            { timeLeft ? 
                <form onSubmit={(e)=>this.handleBidSubmit(e)}>
                    <label>
                    Submit your bid here (USD): <span></span>
                    <input  value={bidAmount} onChange={(e)=>this.handleBidChange(e)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                : item.latest_bid ?
                    <Typography variant='title'>
                    {`The winner of this item is ${item.latest_bidder}`}
                    </Typography>  : 
                    <Typography variant='title'>
                        No bids made on this item
                    </Typography>  
                    }

          </CardContent>
         
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ItemCard);