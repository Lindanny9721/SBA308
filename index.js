const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];
function getLearnerData(course, ag, submissions) {
  try {
    checkCourse(course,ag);
    checkPossiblePoints(ag);
  } catch(e) {
    console.log(e);
  }
  return createLearnerID(submissions,ag);
} 
function checkCourse(course,ag)
{
  if(course.id != ag.course_id)
  {
    throw new Error('Does not match course!');
  }
  return 0;
}
const learnersInfo = [];
function checkPossiblePoints(ag)
{
  for(let i = 0; i < ag.assignments.length; i++)
  {
    if(ag.assignments[i].points_possible === 0)
      {
        throw new Error("It can't be graded out of zero!");
      }
      else if(typeof ag.assignments[i].points_possible === 'string')
      {
        throw new Error("This can't be a string!");
      }
  }
  return 0;
}
function createLearnerID(submissions,ag) {
  submissions.forEach(element => {
    let index = learnersInfo.findIndex(student => student.id === element.learner_id);
    if (index === -1) {
      learnersInfo.push({
        id: element.learner_id,
        submissions: []
      });
      index = learnersInfo.length - 1;
    }
    learnersInfo[index].submissions.push({
      assignment_id: element.assignment_id,
      submitted_at: element.submission.submitted_at,
      score: element.submission.score
    });
  });
return learnersGrade(learnersInfo,ag);
}
function learnersGrade(data,ag)
{
  const learnersData = [];
  for (i in data)
  {
    let totalAssignmentscore = 0;
    let totalScore = 0;
    const gradedAssignment = {};
    for(let j = 0; j < data[i].submissions.length; j++)
    {
      for(let k = 0; k < ag.assignments.length; k++)
      {
        if(data[i].submissions[j].assignment_id === ag.assignments[k].id)
          {
            if(data[i].submissions[j].submitted_at === ag.assignments[j].due_at)
            {
              gradedAssignment[data[i].submissions[j].assignment_id] = data[i].submissions[j].score/ag.assignments[k].points_possible;
              totalScore += data[i].submissions[j].score;
              totalAssignmentscore += ag.assignments[k].points_possible;
              break
            }
            else if (data[i].submissions[j].submitted_at > ag.assignments[j].due_at)
            {
              gradedAssignment[data[i].submissions[j].assignment_id] = (data[i].submissions[j].score - (ag.assignments[k].points_possible/10)) /ag.assignments[k].points_possible;
              totalScore += data[i].submissions[j].score - ag.assignments[k].points_possible/10;
              totalAssignmentscore += ag.assignments[k].points_possible;
              break
            }
          }
      }
    }
    learnersData.push({
      id: data[i].id,
      avg: totalScore/totalAssignmentscore,
      gradedAssignment
    });
  }
  return learnersData;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);