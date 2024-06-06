# Preval test case

# default_yes_yes__undefined.md

> Normalize > Pattern > Param > Arr > Arr > Default yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['fail2'])] = $(['pass3'])) {
  return 'ok';
}
$(f(undefined, 200));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[] = $([`fail2`])] = tmpParamBare === undefined ? $([`pass3`]) : tmpParamBare;
  return `ok`;
};
$(f(undefined, 200));
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
    const tmpCalleeParam = [`pass3`];
    bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamBare;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = [`fail2`];
    arrPatternStep = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  return `ok`;
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(undefined, 200);
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const tmpCalleeParam = [`pass3`];
const bindingPatternArrRoot = $(tmpCalleeParam);
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 = [`fail2`];
  arrPatternStep = $(tmpCalleeParam$1);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
[...arrPatternStep];
$(`ok`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "pass3" ];
const b = $( a );
const c = [ ... b ];
const d = c[ 0 ];
let e = undefined;
const f = d === undefined;
if (f) {
  const g = [ "fail2" ];
  e = $( g );
}
else {
  e = d;
}
[ ... e ];
$( "ok" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass3']
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
