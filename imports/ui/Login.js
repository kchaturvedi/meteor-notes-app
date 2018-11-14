import React from 'react'
import { Link } from 'react-router'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

export class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: ''
    }
  }
  onSubmit (e) {
    e.preventDefault()

    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    this.props.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({ error: 'Check email and password' })
      } else {
        this.setState({ error: '' })
      }
    })
  }
  render () {
    return (
      <div className='container'>
        <div className='space-70' />
        <div className='row justify-content-center'>
          <div style={{ width: 22 + 'rem' }} className='mx-auto'>
            <div className='card card-login text-center'>
              <form className='form' onSubmit={this.onSubmit.bind(this)} noValidate>
                <div className='card-header card-header-info text-center'>
                  <h4 className='card-title'>Login</h4>
                </div>
                {this.state.error ? (
                  <div className='alert alert-danger'>
                    <div className='container'>
                      <div className='alert-icon'>
                        <i className='material-icons'>error_outline</i>
                      </div>
                      {this.state.error}
                    </div>
                  </div>
                ) : undefined}
                <div className='card-body'>
                  <span className='bmd-form-group has-info'>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>
                          <i className='material-icons'>mail</i>
                        </span>
                      </div>
                      <input type='email' className='form-control' ref='email' name='email' placeholder='Email' />
                    </div>
                  </span>
                  <span className='bmd-form-group has-info'>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>
                          <i className='material-icons'>lock</i>
                        </span>
                      </div>
                      <input type='password' className='form-control' ref='password' name='password' placeholder='Password' />
                    </div>
                  </span>
                </div>
                <div style={{ marginTop: 10, marginBottom: 20 }} className='footer text-center'>
                  <button className='btn btn-info btn-lg'>Login</button>
                </div>
              </form>
              <div className='row'>
                <div className='col-sm-10 mr-auto ml-auto'>
                  <Link to='/signup' className='btn btn-info btn-md'>Create an account</Link>
                </div>
                <div style={{ marginTop: 20, marginBottom: 20 }} className='mr-4 ml-4'>
                  <h4><b>Just want to check out the app?</b></h4>
                  <p>Login with 'user@test.com' and 'password' to test the app without creating an account!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginWithPassword: React.PropTypes.func.isRequired
}

export default createContainer(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  }
}, Login)
