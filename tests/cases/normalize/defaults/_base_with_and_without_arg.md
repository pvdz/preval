# Preval test case

# _base_with_and_without_arg.md

> Normalize > Defaults > Base with and without arg
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo") { 
  return a; 
}

$(f('x'));
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let a = tmpParamBare === undefined ? 'foo' : tmpParamBare;
  return a;
};
$(f('x'));
$(f());
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpParamBare$1 = $$0;
    let a$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    a$1 = 'foo';
    const tmpReturnArg = tmpBranchingC(tmpParamBare$1, a$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let a$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    a$3 = tmpParamBare$3;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$3, a$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$5 = $$0;
    let a$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    return a$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(tmpParamBare, a, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpParamBare, a, tmpIfTest);
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f('x');
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
$('x');
$('foo');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
