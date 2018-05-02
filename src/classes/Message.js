const Message = (type, value, from, to, status = 'new') => {
      id: 'message' + '-' + moment().valueOf(),
      type: type,
      value: value,
      from: from,
      to: to,
      status: status,
      timestamp: moment.utc().format() 
})

export default Message