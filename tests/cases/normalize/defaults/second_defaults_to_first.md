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
  const tmpBranchingA = function () {
    debugger;
    a = 'foo';
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    a = tmpParamBare;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$1 = tmpParamBare$1 === undefined;
    const tmpBranchingA$1 = function () {
      debugger;
      b = a;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      b = tmpParamBare$1;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$7 = [a, b];
      return tmpReturnArg$7;
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$9 = tmpBranchingA$1();
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1();
      return tmpReturnArg$11;
    }
  };
  let b = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA();
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$15 = tmpBranchingB();
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
const f = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  const tmpBranchingC$1 = function () {
    debugger;
    const tmpReturnArg$7 = [a, b];
    return tmpReturnArg$7;
  };
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$1 = tmpParamBare$1 === undefined;
    if (tmpIfTest$1) {
      b = a;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    } else {
      b = tmpParamBare$1;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    }
  };
  let b = undefined;
  if (tmpIfTest) {
    a = 'foo';
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    a = tmpParamBare;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f('x');
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f(undefined, 'y');
$(tmpCalleeParam$3);
const tmpCalleeParam$5 = f('x', 'y');
$(tmpCalleeParam$5);
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
