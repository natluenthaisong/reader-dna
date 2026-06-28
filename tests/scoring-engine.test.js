'use strict';

const assert = require('assert');
const path = require('path');
const { scoreQuiz } = require('../src/lib/scoring.ts');

const questionsData = require('../content/questions.json');
const scoringConfig = require('../content/scoring-config.json');

function makeAnswers(valuesById) {
  return questionsData.questions.map((q) => ({
    question_id: q.id,
    value: valuesById[q.id],
  }));
}

function repeatAnswer(value) {
  return questionsData.questions.map((q) => ({ question_id: q.id, value }));
}

function run(name, fn) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (err) {
    console.error(`not ok - ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

run('all answers = 3 returns neutral pole and axis scores', () => {
  const result = scoreQuiz({
    answers: repeatAnswer(3),
    questionsData,
    scoringConfig,
    questionVersion: '1.0.0',
  });
  for (const value of Object.values(result.pole_scores)) assert.strictEqual(value, 50);
  for (const value of Object.values(result.axis_scores)) assert.strictEqual(value, 0);
  assert.ok(['low', 'medium'].includes(result.confidence.label));
});

run('book goblin-like user maps to book_goblin with expected derived scores', () => {
  const values = {
    q01: 3, q02: 4, q03: 3, q04: 4,
    q05: 5, q06: 2, q07: 5, q08: 3,
    q09: 1, q10: 5, q11: 1, q12: 5,
    q13: 3, q14: 4, q15: 3, q16: 4,
    q17: 1, q18: 5, q19: 1, q20: 5,
    q21: 2, q22: 5, q23: 2, q24: 5,
  };
  const result = scoreQuiz({ answers: makeAnswers(values), questionsData, scoringConfig, questionVersion: '1.0.0' });
  assert.strictEqual(result.primary_type, 'book_goblin');
  assert.ok(['collector', 'mood_reader', 'connector'].includes(result.secondary_type));
  assert.ok(result.derived_scores.book_hoarding_risk > 90);
  assert.ok(result.derived_scores.booktok_susceptibility > 80);
  assert.ok(result.derived_scores.finish_probability < 35);
});

run('scholar-like user maps near scholar or deep_diver', () => {
  const values = {
    q01: 5, q02: 2, q03: 5, q04: 2,
    q05: 2, q06: 5, q07: 2, q08: 4,
    q09: 4, q10: 2, q11: 4, q12: 2,
    q13: 5, q14: 2, q15: 5, q16: 1,
    q17: 4, q18: 2, q19: 4, q20: 2,
    q21: 4, q22: 3, q23: 4, q24: 3,
  };
  const result = scoreQuiz({ answers: makeAnswers(values), questionsData, scoringConfig, questionVersion: '1.0.0' });
  assert.ok(['scholar', 'deep_diver'].includes(result.primary_type));
  assert.ok(result.derived_scores.reflection_depth >= 80);
});

run('completionist-like user maps to completionist or adjacent structured type', () => {
  const values = {
    q01: 4, q02: 2, q03: 4, q04: 2,
    q05: 3, q06: 4, q07: 3, q08: 4,
    q09: 5, q10: 1, q11: 5, q12: 1,
    q13: 4, q14: 2, q15: 3, q16: 2,
    q17: 5, q18: 1, q19: 5, q20: 2,
    q21: 3, q22: 3, q23: 3, q24: 3,
  };
  const result = scoreQuiz({ answers: makeAnswers(values), questionsData, scoringConfig, questionVersion: '1.0.0' });
  assert.ok(['completionist', 'strategist', 'curator'].includes(result.primary_type));
  assert.ok(result.derived_scores.finish_probability >= 80);
});

run('invalid answer count throws INVALID_ANSWERS', () => {
  assert.throws(
    () => scoreQuiz({ answers: repeatAnswer(3).slice(0, 23), questionsData, scoringConfig, questionVersion: '1.0.0' }),
    (err) => err.code === 'INVALID_ANSWERS'
  );
});
