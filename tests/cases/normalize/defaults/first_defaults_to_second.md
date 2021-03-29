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
let f = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let a = tmpParamBare === undefined ? b : tmpParamBare;
  let b = tmpParamBare$1 === undefined ? 'bar' : tmpParamBare$1;
  return [a, b];
};
$(f());
$(f('x'));
$(f(undefined, 'y'));
$(f('x', 'y'));
`````

## Normalized

`````js filename=intro
let f = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let tmpParamBare$2 = $$0;
    let tmpParamBare$4 = $$1;
    let a$1 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    a$1 = b;
    const tmpReturnArg = tmpBranchingC(tmpParamBare$2, tmpParamBare$4, a$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let tmpParamBare$6 = $$0;
    let tmpParamBare$8 = $$1;
    let a$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    a$3 = tmpParamBare$6;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$6, tmpParamBare$8, a$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let tmpParamBare$10 = $$0;
    let tmpParamBare$12 = $$1;
    let a$5 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    let b$1 = undefined;
    const tmpIfTest$7 = tmpParamBare$12 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$14 = $$0;
      let tmpParamBare$16 = $$1;
      let a$7 = $$2;
      let tmpIfTest$9 = $$3;
      let b$3 = $$4;
      let tmpIfTest$11 = $$5;
      debugger;
      b$3 = 'bar';
      const tmpReturnArg$3 = tmpBranchingC$1(tmpParamBare$14, tmpParamBare$16, a$7, tmpIfTest$9, b$3, tmpIfTest$11);
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$18 = $$0;
      let tmpParamBare$20 = $$1;
      let a$9 = $$2;
      let tmpIfTest$13 = $$3;
      let b$5 = $$4;
      let tmpIfTest$15 = $$5;
      debugger;
      b$5 = tmpParamBare$20;
      const tmpReturnArg$5 = tmpBranchingC$1(tmpParamBare$18, tmpParamBare$20, a$9, tmpIfTest$13, b$5, tmpIfTest$15);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$22 = $$0;
      let tmpParamBare$24 = $$1;
      let a$11 = $$2;
      let tmpIfTest$17 = $$3;
      let b$7 = $$4;
      let tmpIfTest$19 = $$5;
      debugger;
      const tmpReturnArg$7 = [a$11, b$7];
      return tmpReturnArg$7;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$9 = tmpBranchingA$1(tmpParamBare$10, tmpParamBare$12, a$5, tmpIfTest$5, b$1, tmpIfTest$7);
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1(tmpParamBare$10, tmpParamBare$12, a$5, tmpIfTest$5, b$1, tmpIfTest$7);
      return tmpReturnArg$11;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA(tmpParamBare, tmpParamBare$1, a, tmpIfTest);
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$15 = tmpBranchingB(tmpParamBare, tmpParamBare$1, a, tmpIfTest);
    return tmpReturnArg$15;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f('x');
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(undefined, 'y');
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f('x', 'y');
tmpCallCallee$5(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const tmpSSA_a$2 = b;
const tmpReturnArg$15 = [tmpSSA_a$2, 'bar'];
$(tmpReturnArg$15);
const tmpReturnArg$19 = ['x', 'bar'];
$(tmpReturnArg$19);
const tmpSSA_a$6 = b;
const tmpReturnArg$4 = [tmpSSA_a$6, 'y'];
$(tmpReturnArg$4);
const tmpReturnArg$9 = ['x', 'y'];
$(tmpReturnArg$9);
`````

## Globals

BAD@! Found 1 implicit global bindings:

b

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
