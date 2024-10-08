// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
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
  
  // The provided learner submission data.
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
    createLearnerID(submissions,ag);
    // here, we would process this data to achieve the desired result.
    const result = [
      {
        id: 125,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150
      },
      {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150
      }
    ];
  
    return result;
  } 
  function checkCourse(course,ag)
  {
    if(course.id != ag.course_id)
    {
      throw new Error('Does not match course!');
    }
    return 0;
  }
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
  const learnersInfo = [];
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
    learnersGrade(learnersInfo,ag);
  }
  function learnersGrade(data,ag)
  {
    for (i in data)
    {
      console.log(data[i].submissions);
      const totalScore = data[i].submissions.reduce((sum, student) => sum + student.score, 0);

      console.log(totalScore);
    }
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);