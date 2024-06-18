# Preval test case

# default_yes_yes__empty.md

> Normalize > Pattern > Param > Arr > Obj > Default yes yes  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([{} = $('fail')] = $(['fail2'])) {
  return 'bad';
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [{} = $(`fail`)] = tmpParamBare === undefined ? $([`fail2`]) : tmpParamBare;
  return `bad`;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = [`fail2`];
    bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamBare;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    arrPatternStep = $(`fail`);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let objPatternCrashTest = arrPatternStep === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep.cannotDestructureThis;
    return `bad`;
  } else {
    return `bad`;
  }
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpCalleeParam = [`fail2`];
const tmpClusterSSA_bindingPatternArrRoot = $(tmpCalleeParam);
const arrPatternSplat = [...tmpClusterSSA_bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
let objPatternCrashTest = false;
if (tmpIfTest$1) {
  arrPatternStep = $(`fail`);
  objPatternCrashTest = arrPatternStep === undefined;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep === null;
}
if (objPatternCrashTest) {
  arrPatternStep.cannotDestructureThis;
} else {
}
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "fail2" ];
const b = $( a );
const c = [ ... b ];
const d = c[ 0 ];
let e = undefined;
const f = d === undefined;
let g = false;
if (f) {
  e = $( "fail" );
  g = e === undefined;
}
else {
  e = d;
}
if (g) {

}
else {
  g = e === null;
}
if (g) {
  e.cannotDestructureThis;
}
$( "bad" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['fail2']
 - 2: 'bad'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
