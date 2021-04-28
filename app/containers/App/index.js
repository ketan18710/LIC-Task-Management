/**
 *
 * App
 *
 */

import React, { memo , useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { redirectToUrl } from 'utils/common';
import makeSelectApp,{makeSelectData} from './selectors';
import { getData} from './actions'
import reducer from './reducer';
import saga from './saga';
import { Switch, Route } from 'react-router-dom';
import './style.scss';
import {APP_ROUTES} from 'utils/constants'
import Error404 from 'components/Error404';
import Loader from 'components/Loader';
import TaskBoard from 'components/TaskBoard';

export function App(props) {
  const {fetchData,data} = props
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });
  const [loading, setLoading] = useState(null)
  const [users, setUsers] = useState([
    {
      name : 'Ketan',
      id : 'KV'
    },
    {
      name : 'Kanav',
      id : 'KB'
    },
    {
      name : 'Vedanshu',
      id : 'V'
    },
  ])
  const [tasks, setTasks] = useState([
    {
      title : 'Task 1',
      description : 'Task description',
      task_id : 'dsfsfs',
      list : 'toDo',
      user_id : 'fvdffd',
      start_time : null,
      due_time : null,
      buffer_time : null,
    },
    {
      title : 'Task 2',
      description : 'Task2 description',
      task_id : 'dsfsfdfdfdfs',
      list : 'progress',
      user_id : 'fvdffd',
      start_time : null,
      due_time : null,
      buffer_time : null,
    },
  ])
  const [lists, setLists] = useState([
    {
      name : 'To - Do',
      id : 'toDo'
    },
    {
      name : 'In Progress',
      id : 'progress'
    },
    {
      name : 'Testing',
      id : 'testing'
    },
    {
      name : 'Finished',
      id : 'finished'
    },
  ])
  useEffect(() => {
    // fetchData()
    // setLoading(true)
  }, [])
  return (
    <>
      <Helmet
        titleTemplate="%s - Website Title"
        defaultTitle="Website Title"
      >
        <meta name="description" content="Website Title" />
      </Helmet>
      <>
        {
          loading ?
          <Loader />:
          <>
          <ToastContainer
              position="top-right"
              hideProgressBar
              autoClose={1000}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
            <div id="mainBody">
                <Switch>
                  <Route exact path={APP_ROUTES.HOME} component={()=><TaskBoard  users={users} setUsers={(data)=>setUsers(data)}   tasks={tasks} setTasks={(data)=>setTasks(data)}  lists={lists} setLists={(data)=>setLists(data)}/>} />
                  <Route component={Error404} />
                </Switch>
              </div>
          <ToastContainer />
          </>
        }
      </>
    </>     
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
  data: makeSelectData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchData: () => dispatch(getData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
