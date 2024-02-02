import PropTypes from 'prop-types'

const Alert = ({ alert }) => {
  return (
    <small
      className={`${
        alert.error ? 'text-red-400 whitespace-pre' : 'text-custom-cyan'
      } text-center block`}
    >
      {alert.msg}
    </small>
  )
}

Alert.propTypes = {
  alert: PropTypes.object.isRequired
}

export default Alert
