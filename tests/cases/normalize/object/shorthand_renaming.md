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
  let { x: x = 10 } = tmpParamBare;
  return x;
};
let g = function ($$0) {
  const tmpParamBare$1 = $$0;
  debugger;
  let { x: x$1 = 10 } = tmpParamBare$1;
  let y = { x: x$1 };
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
    let tmpParamBare$4 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let objPatternBeforeDefault$3 = $$2;
    let x$4 = $$3;
    let tmpIfTest$3 = $$4;
    debugger;
    x$4 = objPatternBeforeDefault$3;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$4, bindingPatternObjRoot$3, objPatternBeforeDefault$3, x$4, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$6 = $$0;
    let bindingPatternObjRoot$5 = $$1;
    let objPatternBeforeDefault$5 = $$2;
    let x$6 = $$3;
    let tmpIfTest$5 = $$4;
    debugger;
    return x$6;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, x, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, x, tmpIfTest);
    return tmpReturnArg$5;
  }
};
let g = function ($$0) {
  const tmpParamBare$1 = $$0;
  debugger;
  let bindingPatternObjRoot$7 = tmpParamBare$1;
  let objPatternBeforeDefault$7 = bindingPatternObjRoot$7.x;
  let x$1 = undefined;
  const tmpIfTest$7 = objPatternBeforeDefault$7 === undefined;
  const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$8 = $$0;
    let bindingPatternObjRoot$9 = $$1;
    let objPatternBeforeDefault$9 = $$2;
    let x$8 = $$3;
    let tmpIfTest$9 = $$4;
    debugger;
    x$8 = 10;
    const tmpReturnArg$7 = tmpBranchingC$1(tmpParamBare$8, bindingPatternObjRoot$9, objPatternBeforeDefault$9, x$8, tmpIfTest$9);
    return tmpReturnArg$7;
  };
  const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$10 = $$0;
    let bindingPatternObjRoot$11 = $$1;
    let objPatternBeforeDefault$11 = $$2;
    let x$10 = $$3;
    let tmpIfTest$11 = $$4;
    debugger;
    x$10 = objPatternBeforeDefault$11;
    const tmpReturnArg$9 = tmpBranchingC$1(tmpParamBare$10, bindingPatternObjRoot$11, objPatternBeforeDefault$11, x$10, tmpIfTest$11);
    return tmpReturnArg$9;
  };
  const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$12 = $$0;
    let bindingPatternObjRoot$13 = $$1;
    let objPatternBeforeDefault$13 = $$2;
    let x$12 = $$3;
    let tmpIfTest$13 = $$4;
    debugger;
    let y$1 = { x: x$12 };
    const tmpReturnArg$11 = [x$12, y$1];
    return tmpReturnArg$11;
  };
  if (tmpIfTest$7) {
    const tmpReturnArg$13 = tmpBranchingA$1(tmpParamBare$1, bindingPatternObjRoot$7, objPatternBeforeDefault$7, x$1, tmpIfTest$7);
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$15 = tmpBranchingB$1(tmpParamBare$1, bindingPatternObjRoot$7, objPatternBeforeDefault$7, x$1, tmpIfTest$7);
    return tmpReturnArg$15;
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
