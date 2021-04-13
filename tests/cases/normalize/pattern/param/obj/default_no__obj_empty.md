# Preval test case

# default_no__obj_empty.md

> Normalize > Pattern > Param > Obj > Default no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({}) {
  return 'ok';
}
$(f({}, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {} = tmpParamBare;
  return 'ok';
};
$(f({}, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternCrashTest = bindingPatternObjRoot === undefined;
  const tmpBranchingA = function () {
    debugger;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    objPatternCrashTest = bindingPatternObjRoot === null;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpBranchingA$1 = function () {
      debugger;
      objPatternCrashTest = bindingPatternObjRoot.cannotDestructureThis;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      return 'ok';
    };
    if (objPatternCrashTest) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1();
      return tmpReturnArg$9;
    }
  };
  if (objPatternCrashTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = {};
const tmpCalleeParam$3 = 10;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = {};
let objPatternCrashTest = tmpCalleeParam$1 === undefined;
const tmpBranchingC = function () {
  debugger;
  if (objPatternCrashTest) {
    objPatternCrashTest = tmpCalleeParam$1.cannotDestructureThis;
    return 'ok';
  } else {
    return 'ok';
  }
};
if (objPatternCrashTest) {
  tmpBranchingC();
} else {
  objPatternCrashTest = tmpCalleeParam$1 === null;
  tmpBranchingC();
}
$('ok');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
