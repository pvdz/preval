# Preval test case

# flash2.md

> Normalize > Pattern > Binding > Flash2
>
> Regression hunting

## Options

TDZ errors are not properly emulated so a n eval mismatch is expected

- skipEval

## Input

`````js filename=intro
function x(foo = x, {x}) { 
  //return [foo, x]; 
}
x();
`````

## Pre Normal

`````js filename=intro
let x = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let foo = tmpParamBare === undefined ? x$1 : tmpParamBare;
  let { x$1 } = tmpParamBare$1;
};
x();
`````

## Normalized

`````js filename=intro
let x = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let foo = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let tmpParamBare$2 = $$0;
    let tmpParamBare$4 = $$1;
    let foo$1 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    foo$1 = x$1;
    const tmpReturnArg = tmpBranchingC(tmpParamBare$2, tmpParamBare$4, foo$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let tmpParamBare$6 = $$0;
    let tmpParamBare$8 = $$1;
    let foo$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    foo$3 = tmpParamBare$6;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$6, tmpParamBare$8, foo$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let tmpParamBare$10 = $$0;
    let tmpParamBare$12 = $$1;
    let foo$5 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    let bindingPatternObjRoot = tmpParamBare$12;
    let x$2 = bindingPatternObjRoot.x$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(tmpParamBare, tmpParamBare$1, foo, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpParamBare, tmpParamBare$1, foo, tmpIfTest);
    return tmpReturnArg$5;
  }
};
x();
`````

## Output

`````js filename=intro
undefined.x$1;
throw '[Preval]: Can not reach here';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
