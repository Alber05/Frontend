import PropTypes from 'prop-types'

const Alert = ({ alert }) => {
  return (
    <small
      className={`${
        alert.error ? 'whitespace-pre text-red-400' : 'text-custom-cyan'
      } block text-center`}
    >
      {alert.msg}
    </small>
  )
}

Alert.propTypes = {
  alert: PropTypes.object.isRequired
}

export default Alert
