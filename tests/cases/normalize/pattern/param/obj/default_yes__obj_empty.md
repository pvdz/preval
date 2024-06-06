# Preval test case

# default_yes__obj_empty.md

> Normalize > Pattern > Param > Obj > Default yes  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({} = $('fail')) {
  return 'ok';
}
$(f({}, 10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {} = tmpParamBare === undefined ? $(`fail`) : tmpParamBare;
  return `ok`;
};
$(f({}, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    bindingPatternObjRoot = $(`fail`);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let objPatternCrashTest = bindingPatternObjRoot === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = bindingPatternObjRoot === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = bindingPatternObjRoot.cannotDestructureThis;
    return `ok`;
  } else {
    return `ok`;
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
$(`ok`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "ok" );
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
