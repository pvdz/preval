# Preval test case

# default_yes_no__null.md

> Normalize > Pattern > Param > Obj > Ident > Default yes no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x = $('fail') }) {
  return 'bad';
}
$(f(null, 10));
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamPattern) {
  let { x = $('fail') } = tmpParamPattern;
  return 'bad';
};
$(f(null, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingA = function (tmpParamPattern$1, bindingPatternObjRoot$1, objPatternBeforeDefault$1, x$1, tmpIfTest$1) {
    x$1 = $('fail');
    const tmpReturnArg = tmpBranchingC(tmpParamPattern$1, bindingPatternObjRoot$1, objPatternBeforeDefault$1, x$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpParamPattern$2, bindingPatternObjRoot$2, objPatternBeforeDefault$2, x$2, tmpIfTest$2) {
    x$2 = objPatternBeforeDefault$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamPattern$2, bindingPatternObjRoot$2, objPatternBeforeDefault$2, x$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpParamPattern$3, bindingPatternObjRoot$3, objPatternBeforeDefault$3, x$3, tmpIfTest$3) {
    return 'bad';
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpParamPattern, bindingPatternObjRoot, objPatternBeforeDefault, x, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpParamPattern, bindingPatternObjRoot, objPatternBeforeDefault, x, tmpIfTest);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(null, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternBeforeDefault = tmpParamPattern.x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    $('fail');
    return 'bad';
  } else {
    return 'bad';
  }
};
const tmpCalleeParam = f(null, 10);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
