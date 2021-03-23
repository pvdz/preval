# Preval test case

# shorthand_renaming.md

> Normalize > Object > Shorthand renaming
>
> The unique naming system must properly handle property shorthands

#TODO

## Input

`````js filename=intro
let f = function({x = 10}) {
  return x;
}
let g = function({x = 10}) {
  let y = {x}; // Make sure x gets renamed
  return [x, y];
}
$(f(), g());
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x = 10 } = tmpParamBare;
  return x;
};
let g = function ($$0) {
  const tmpParamBare$1 = $$0;
  debugger;
  let { x$1 = 10 } = tmpParamBare$1;
  let y = { x$1 };
  return [x$1, y];
};
$(f(), g());
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$2 = $$0;
    let bindingPatternObjRoot$1 = $$1;
    let objPatternBeforeDefault$1 = $$2;
    let x$2 = $$3;
    let tmpIfTest$1 = $$4;
    debugger;
    x$2 = 10;
    const tmpReturnArg = tmpBranchingC(tmpParamBare$2, bindingPatternObjRoot$1, objPatternBeforeDefault$1, x$2, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$2 = $$1;
    let objPatternBeforeDefault$2 = $$2;
    let x$3 = $$3;
    let tmpIfTest$2 = $$4;
    debugger;
    x$3 = objPatternBeforeDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$3, bindingPatternObjRoot$2, objPatternBeforeDefault$2, x$3, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$4 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let objPatternBeforeDefault$3 = $$2;
    let x$4 = $$3;
    let tmpIfTest$3 = $$4;
    debugger;
    return x$4;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, x, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, x, tmpIfTest);
    return tmpReturnArg$3;
  }
};
let g = function ($$0) {
  const tmpParamBare$1 = $$0;
  debugger;
  let bindingPatternObjRoot$4 = tmpParamBare$1;
  let objPatternBeforeDefault$4 = bindingPatternObjRoot$4.x$1;
  let x$1 = undefined;
  const tmpIfTest$4 = objPatternBeforeDefault$4 === undefined;
  const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$5 = $$0;
    let bindingPatternObjRoot$5 = $$1;
    let objPatternBeforeDefault$5 = $$2;
    let x$5 = $$3;
    let tmpIfTest$5 = $$4;
    debugger;
    x$5 = 10;
    const tmpReturnArg$4 = tmpBranchingC$1(tmpParamBare$5, bindingPatternObjRoot$5, objPatternBeforeDefault$5, x$5, tmpIfTest$5);
    return tmpReturnArg$4;
  };
  const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$6 = $$0;
    let bindingPatternObjRoot$6 = $$1;
    let objPatternBeforeDefault$6 = $$2;
    let x$6 = $$3;
    let tmpIfTest$6 = $$4;
    debugger;
    x$6 = objPatternBeforeDefault$6;
    const tmpReturnArg$5 = tmpBranchingC$1(tmpParamBare$6, bindingPatternObjRoot$6, objPatternBeforeDefault$6, x$6, tmpIfTest$6);
    return tmpReturnArg$5;
  };
  const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$7 = $$0;
    let bindingPatternObjRoot$7 = $$1;
    let objPatternBeforeDefault$7 = $$2;
    let x$7 = $$3;
    let tmpIfTest$7 = $$4;
    debugger;
    let y$1 = { x$1: x$7 };
    const tmpReturnArg$6 = [x$7, y$1];
    return tmpReturnArg$6;
  };
  if (tmpIfTest$4) {
    const tmpReturnArg$7 = tmpBranchingA$1(tmpParamBare$1, bindingPatternObjRoot$4, objPatternBeforeDefault$4, x$1, tmpIfTest$4);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$8 = tmpBranchingB$1(tmpParamBare$1, bindingPatternObjRoot$4, objPatternBeforeDefault$4, x$1, tmpIfTest$4);
    return tmpReturnArg$8;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = g();
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
undefined.x;
throw '[Preval]: Can not reach here';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
