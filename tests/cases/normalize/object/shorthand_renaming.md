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
$(x, y, f(), g());
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let { x = 10 } = tmpParamPattern;
  return x;
};
let g = function (tmpParamPattern$1) {
  let { x$1 = 10 } = tmpParamPattern$1;
  let y = { x$1 };
  return [x$1, y];
};
$(x$2, y$1, f(), g());
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingA = function (tmpParamPattern$2, bindingPatternObjRoot$1, objPatternBeforeDefault$1, x$3, tmpIfTest$1) {
    x$3 = 10;
    const tmpReturnArg = tmpBranchingC(tmpParamPattern$2, bindingPatternObjRoot$1, objPatternBeforeDefault$1, x$3, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamPattern$3, bindingPatternObjRoot$2, objPatternBeforeDefault$2, x$4, tmpIfTest$2) {
    x$4 = objPatternBeforeDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamPattern$3, bindingPatternObjRoot$2, objPatternBeforeDefault$2, x$4, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamPattern$4, bindingPatternObjRoot$3, objPatternBeforeDefault$3, x$5, tmpIfTest$3) {
    return x$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpParamPattern, bindingPatternObjRoot, objPatternBeforeDefault, x, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpParamPattern, bindingPatternObjRoot, objPatternBeforeDefault, x, tmpIfTest);
    return tmpReturnArg$3;
  }
};
let g = function (tmpParamPattern$1) {
  let bindingPatternObjRoot$4 = tmpParamPattern$1;
  let objPatternBeforeDefault$4 = bindingPatternObjRoot$4.x$1;
  let x$1 = undefined;
  const tmpIfTest$4 = objPatternBeforeDefault$4 === undefined;
  const tmpBranchingA$1 = function (tmpParamPattern$5, bindingPatternObjRoot$5, objPatternBeforeDefault$5, x$6, tmpIfTest$5) {
    x$6 = 10;
    const tmpReturnArg$4 = tmpBranchingC$1(tmpParamPattern$5, bindingPatternObjRoot$5, objPatternBeforeDefault$5, x$6, tmpIfTest$5);
    return tmpReturnArg$4;
  };
  const tmpBranchingB$1 = function (tmpParamPattern$6, bindingPatternObjRoot$6, objPatternBeforeDefault$6, x$7, tmpIfTest$6) {
    x$7 = objPatternBeforeDefault$6;
    const tmpReturnArg$5 = tmpBranchingC$1(tmpParamPattern$6, bindingPatternObjRoot$6, objPatternBeforeDefault$6, x$7, tmpIfTest$6);
    return tmpReturnArg$5;
  };
  const tmpBranchingC$1 = function (tmpParamPattern$7, bindingPatternObjRoot$7, objPatternBeforeDefault$7, x$8, tmpIfTest$7) {
    let y$2 = { x$1: x$8 };
    const tmpReturnArg$6 = [x$8, y$2];
    return tmpReturnArg$6;
  };
  if (tmpIfTest$4) {
    const tmpReturnArg$7 = tmpBranchingA$1(tmpParamPattern$1, bindingPatternObjRoot$4, objPatternBeforeDefault$4, x$1, tmpIfTest$4);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$8 = tmpBranchingB$1(tmpParamPattern$1, bindingPatternObjRoot$4, objPatternBeforeDefault$4, x$1, tmpIfTest$4);
    return tmpReturnArg$8;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = x$2;
const tmpCalleeParam$1 = y$1;
const tmpCalleeParam$2 = f();
const tmpCalleeParam$3 = g();
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2, tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternBeforeDefault = tmpParamPattern.x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    return 10;
  } else {
    return objPatternBeforeDefault;
  }
};
const g = function (tmpParamPattern$1) {
  const objPatternBeforeDefault$4 = tmpParamPattern$1.x$1;
  const tmpIfTest$4 = objPatternBeforeDefault$4 === undefined;
  const tmpBranchingC$1 = function (x$8) {
    const y$2 = { x$1: x$8 };
    const tmpReturnArg$6 = [x$8, y$2];
    return tmpReturnArg$6;
  };
  if (tmpIfTest$4) {
    const tmpReturnArg$4 = tmpBranchingC$1(10);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = tmpBranchingC$1(objPatternBeforeDefault$4);
    return tmpReturnArg$5;
  }
};
const tmpCalleeParam = x$2;
const tmpCalleeParam$1 = y$1;
const tmpCalleeParam$2 = f();
const tmpCalleeParam$3 = g();
$(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2, tmpCalleeParam$3);
`````

## Globals

BAD@! Found 2 implicit global bindings:

x$2, y$1

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
