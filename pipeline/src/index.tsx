import * as React from 'react'
import cx from 'classnames';

import styles from './styles.css'

interface Pipeline {
  stages: Stage[]
}

interface Stage {
  title: string
  jobs: Job[]
}

interface Job {
  name: string
  status: 'success' | 'fail'
  time: number
}

const PIPELINE_FOR_DEMO: Pipeline = {
  stages: [{
    title: '编译',
    jobs: [{
      name: '编译',
      status: 'success',
      time: 61
    }]
  }, {
    title: '部署',
    jobs: [{
      name: '部署',
      status: 'success',
      time: 129
    }]
  }, {
    title: '代码扫描和检查',
    jobs: [{
      name: 'STC',
      status: 'success',
      time: 146
    }, {
      name: 'PMD',
      status: 'success',
      time: 52
    }]
  }, {
    title: '测试',
    jobs: [{
      name: '集成测试',
      status: 'fail',
      time: 334
    }, {
      name: '单元测试',
      status: 'fail',
      time: 334
    }]
  }]
};


type PipelineContainerProps = {
  pipeline: Pipeline
  className?: string
}
export default function PipelineContainer({ pipeline = PIPELINE_FOR_DEMO, className, ...rest } : PipelineContainerProps) {
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

type StageContainerProps = {
  stage: Stage
  className?: string
}
function StageContainer({ stage, className, ...rest }: StageContainerProps) {
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

type JobContainerProps = {
  job: Job
  className?: string
}
function JobContainer({ job, className, ...rest}: JobContainerProps) {
  const {
    name,
    status,
    time
  } = job;

  let color: string = 'darkgray';
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

function formatTime(time: number): string {
  const minutes = Math.floor(time/60);
  const hours = Math.floor(minutes/60);

  function addLeadingZero(number: number): string {
    const numberStr: string = number + '';
    return numberStr.length === 1 ? '0' + number : numberStr;
  }

  const secondsStr: string = addLeadingZero(time % 60);
  const minutesStr: string = addLeadingZero(minutes % 60);
  const hoursStr: string = addLeadingZero(hours);

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
}
