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
let x = function (tmpParamDefault, tmpParamPattern) {
  let foo = tmpParamDefault === undefined ? x$1 : tmpParamDefault;
  let { x$1 } = tmpParamPattern;
};
x();
`````

## Normalized

`````js filename=intro
let x = function (tmpParamDefault, tmpParamPattern) {
  let foo = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  const tmpBranchingA = function (tmpParamDefault$1, tmpParamPattern$1, foo$1, tmpIfTest$1) {
    foo$1 = x$1;
    const tmpReturnArg = tmpBranchingC(tmpParamDefault$1, tmpParamPattern$1, foo$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamDefault$2, tmpParamPattern$2, foo$2, tmpIfTest$2) {
    foo$2 = tmpParamDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamDefault$2, tmpParamPattern$2, foo$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamDefault$3, tmpParamPattern$3, foo$3, tmpIfTest$3) {
    let bindingPatternObjRoot = tmpParamPattern$3;
    let x$2 = bindingPatternObjRoot.x$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpParamDefault, tmpParamPattern, foo, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpParamDefault, tmpParamPattern, foo, tmpIfTest);
    return tmpReturnArg$3;
  }
};
x();
`````

## Output

`````js filename=intro
x$1;
undefined.x$1;
throw '[Preval]: Can not reach here';
`````

## Globals

BAD@! Found 1 implicit global bindings:

x$1
