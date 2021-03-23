# Preval test case

# second_defaults_to_first.md

> Normalize > Defaults > Second defaults to first
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo", b = a) { 
  return [a, b]; 
}

$(f()); // [foo, foo]
$(f('x')); // [x, x]
$(f(undefined, 'y')); // [foo, y]
$(f('x', 'y')); // [x, y]
`````

## Pre Normal

`````js filename=intro
let f = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let a = tmpParamBare === undefined ? 'foo' : tmpParamBare;
  let b = tmpParamBare$1 === undefined ? a : tmpParamBare$1;
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
    let tmpParamBare$3 = $$1;
    let a$1 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    a$1 = 'foo';
    const tmpReturnArg = tmpBranchingC(tmpParamBare$2, tmpParamBare$3, a$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let tmpParamBare$4 = $$0;
    let tmpParamBare$5 = $$1;
    let a$2 = $$2;
    let tmpIfTest$2 = $$3;
    debugger;
    a$2 = tmpParamBare$4;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$4, tmpParamBare$5, a$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let tmpParamBare$6 = $$0;
    let tmpParamBare$7 = $$1;
    let a$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    let b$1 = undefined;
    const tmpIfTest$4 = tmpParamBare$7 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$8 = $$0;
      let tmpParamBare$9 = $$1;
      let a$4 = $$2;
      let tmpIfTest$5 = $$3;
      let b$2 = $$4;
      let tmpIfTest$6 = $$5;
      debugger;
      b$2 = a$4;
      const tmpReturnArg$2 = tmpBranchingC$1(tmpParamBare$8, tmpParamBare$9, a$4, tmpIfTest$5, b$2, tmpIfTest$6);
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$10 = $$0;
      let tmpParamBare$11 = $$1;
      let a$5 = $$2;
      let tmpIfTest$7 = $$3;
      let b$3 = $$4;
      let tmpIfTest$8 = $$5;
      debugger;
      b$3 = tmpParamBare$11;
      const tmpReturnArg$3 = tmpBranchingC$1(tmpParamBare$10, tmpParamBare$11, a$5, tmpIfTest$7, b$3, tmpIfTest$8);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$12 = $$0;
      let tmpParamBare$13 = $$1;
      let a$6 = $$2;
      let tmpIfTest$9 = $$3;
      let b$4 = $$4;
      let tmpIfTest$10 = $$5;
      debugger;
      const tmpReturnArg$4 = [a$6, b$4];
      return tmpReturnArg$4;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$5 = tmpBranchingA$1(tmpParamBare$6, tmpParamBare$7, a$3, tmpIfTest$3, b$1, tmpIfTest$4);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$6 = tmpBranchingB$1(tmpParamBare$6, tmpParamBare$7, a$3, tmpIfTest$3, b$1, tmpIfTest$4);
      return tmpReturnArg$6;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingA(tmpParamBare, tmpParamBare$1, a, tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$8 = tmpBranchingB(tmpParamBare, tmpParamBare$1, a, tmpIfTest);
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
const f = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingC = function ($$0, $$1) {
    const tmpParamBare$7 = $$0;
    const a$3 = $$1;
    debugger;
    const tmpIfTest$4 = tmpParamBare$7 === undefined;
    const tmpBranchingC$1 = function ($$0, $$1) {
      const a$6 = $$0;
      const b$4 = $$1;
      debugger;
      const tmpReturnArg$4 = [a$6, b$4];
      return tmpReturnArg$4;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$5 = tmpBranchingC$1(a$3, a$3);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$6 = tmpBranchingC$1(a$3, tmpParamBare$7);
      return tmpReturnArg$6;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingC(tmpParamBare$1, 'foo');
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$8 = tmpBranchingC(tmpParamBare$1, tmpParamBare);
    return tmpReturnArg$8;
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

None

## Result

Should call `$` with:
 - 1: ['foo', 'foo']
 - 2: ['x', 'x']
 - 3: ['foo', 'y']
 - 4: ['x', 'y']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
