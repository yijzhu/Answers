import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames';

import styles from './styles.css'

function Pipeline() {
  this.stages = [];
}

function Stage() {
  this.title = null;
  this.jobs = [];
}

function Job() {
  this.name = null;
  this.status = null; // 'success' || 'fail'
  this.time = 0; // number
}

const PIPELINE_FOR_DEMO = {
  stages: [{
    title: '编译',
    jobs: [{
      name: '编译',
      status: 'success',
      time: '61'
    }]
  }, {
    title: '部署',
    jobs: [{
      name: '部署',
      status: 'success',
      time: '129'
    }]
  }, {
    title: '代码扫描和检查',
    jobs: [{
      name: 'STC',
      status: 'success',
      time: '146'
    }, {
      name: 'PMD',
      status: 'success',
      time: '52'
    }]
  }, {
    title: '测试',
    jobs: [{
      name: '集成测试',
      status: 'fail',
      time: '334'
    }, {
      name: '单元测试',
      status: 'fail',
      time: '334'
    }]
  }]
};

export default function PipelineContainer({ pipeline = PIPELINE_FOR_DEMO, className, ...rest }) {
  const {
    stages = []
  } = pipeline;
  return (
    <div
      className={cx(styles['pipeline'], className)}
      {...rest}
    >
      {
        stages.map(stage => <StageContainer stage={stage} key={stage.title} />)
      }
    </div>
  )
}
PipelineContainer.propTypes = {
  pipeline: PropTypes.object
};

function StageContainer({ stage, className, ...rest }) {
  const {
    title,
    jobs = []
  } = stage;

  return (
    <div className={cx(styles['pipeline-stage'], className)} {...rest}>
      <h4>{title}</h4>
      {
        jobs.map(job => <JobContainer key={job.name} job={job} />)
      }
    </div>
  )
}
StageContainer.propTypes = {
  stage: PropTypes.object.isRequired
};

function JobContainer({ job, className, ...rest}) {
  const {
    name,
    status,
    time
  } = job;

  let color = 'darkgray';
  if (status === 'success') {
    color = 'green';
  } else if (status === 'fail') {
    color = 'red';
  }
  return (
    <div className={cx(styles['pipeline-job'], className)} {...rest}>
      <div className={styles['pipeline-job-title']}>
        <div className={styles['pipeline-status-icon']} style={{ backgroundColor: color }}/>
        <span>{name}</span>
      </div>
      <span>{formatTime(time)}</span>
    </div>
  )
}
JobContainer.propTypes = {
  job: PropTypes.object.isRequired
};

function formatTime(time) {
  if (typeof time !== 'number') return time;

  const minutes = Math.floor(time/60);
  const hours = Math.floor(minutes/60);

  function addLeadingZero(number) {
    number = number + '';
    return number.length === 1 ? '0' + number : number;
  }

  const secondsStr = addLeadingZero(time % 60);
  const minutesStr = addLeadingZero(minutes % 60);
  const hoursStr = addLeadingZero(hours);

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
}


