# Preval test case

# first_defaults_to_second.md

> Normalize > Defaults > First defaults to second
>
> Rewrite function param defaults to equivalent body code

TDZ case

## Options

TDZ errors are not properly emulated so a n eval mismatch is expected

- skipEval

## Input

`````js filename=intro
function f(a = b, b = "bar") { 
  return [a, b]; 
}

$(f()); // runtime error
$(f('x')); // [x, bar]
$(f(undefined, 'y')); // runtime error
$(f('x', 'y')); // [x, y]
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault, tmpParamDefault$1) {
  let a = tmpParamDefault === undefined ? b : tmpParamDefault;
  let b = tmpParamDefault$1 === undefined ? 'bar' : tmpParamDefault$1;
  return [a, b];
};
$(f());
$(f('x'));
$(f(undefined, 'y'));
$(f('x', 'y'));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault, tmpParamDefault$1) {
  let a = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$2, tmpParamDefault$3, a$1, tmpIfTest$1) {
    a$1 = b;
    const tmpReturnArg = tmpBranchingC(tmpParamDefault$2, tmpParamDefault$3, a$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamDefault$4, tmpParamDefault$5, a$2, tmpIfTest$2) {
    a$2 = tmpParamDefault$4;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$4, tmpParamDefault$5, a$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamDefault$6, tmpParamDefault$7, a$3, tmpIfTest$3) {
    let b$1 = undefined;
    const tmpIfTest$4 = tmpParamDefault$7 === undefined;
    const tmpBranchingA$1 = function (tmpParamDefault$8, tmpParamDefault$9, a$4, tmpIfTest$5, b$2, tmpIfTest$6) {
      b$2 = 'bar';
      const tmpReturnArg$2 = tmpBranchingC$1(tmpParamDefault$8, tmpParamDefault$9, a$4, tmpIfTest$5, b$2, tmpIfTest$6);
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (tmpParamDefault$10, tmpParamDefault$11, a$5, tmpIfTest$7, b$3, tmpIfTest$8) {
      b$3 = tmpParamDefault$11;
      const tmpReturnArg$3 = tmpBranchingC$1(tmpParamDefault$10, tmpParamDefault$11, a$5, tmpIfTest$7, b$3, tmpIfTest$8);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (tmpParamDefault$12, tmpParamDefault$13, a$6, tmpIfTest$9, b$4, tmpIfTest$10) {
      const tmpReturnArg$4 = [a$6, b$4];
      return tmpReturnArg$4;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$5 = tmpBranchingA$1(tmpParamDefault$6, tmpParamDefault$7, a$3, tmpIfTest$3, b$1, tmpIfTest$4);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$6 = tmpBranchingB$1(tmpParamDefault$6, tmpParamDefault$7, a$3, tmpIfTest$3, b$1, tmpIfTest$4);
      return tmpReturnArg$6;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingA(tmpParamDefault, tmpParamDefault$1, a, tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$8 = tmpBranchingB(tmpParamDefault, tmpParamDefault$1, a, tmpIfTest);
    return tmpReturnArg$8;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f('x');
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f(undefined, 'y');
tmpCallCallee$2(tmpCalleeParam$2);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f('x', 'y');
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault, tmpParamDefault$1) {
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingC = function (tmpParamDefault$7, a$3) {
    const tmpIfTest$4 = tmpParamDefault$7 === undefined;
    const tmpBranchingC$1 = function (a$6, b$4) {
      const tmpReturnArg$4 = [a$6, b$4];
      return tmpReturnArg$4;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$2 = tmpBranchingC$1(a$3, 'bar');
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$3 = tmpBranchingC$1(a$3, tmpParamDefault$7);
      return tmpReturnArg$3;
    }
  };
  if (tmpIfTest) {
    const SSA_a$1 = b;
    const tmpReturnArg = tmpBranchingC(tmpParamDefault$1, SSA_a$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$1, tmpParamDefault);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f('x');
$(tmpCalleeParam$1);
const tmpCalleeParam$2 = f(undefined, 'y');
$(tmpCalleeParam$2);
const tmpCalleeParam$3 = f('x', 'y');
$(tmpCalleeParam$3);
`````

## Globals

BAD@! Found 1 implicit global bindings:

b
