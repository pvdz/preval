# Preval test case

# default_yes_no_no__str.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } }) {
  return 'bad';
}
$(f('abc', 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: { y: y = $('fail') },
  } = tmpParamBare;
  return 'bad';
};
$(f('abc', 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  let y = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingA = function () {
    debugger;
    y = $('fail');
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    y = objPatternBeforeDefault;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    return 'bad';
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f('abc', 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const objPatternNoDefault = 'abc'.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  $('fail');
} else {
}
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
