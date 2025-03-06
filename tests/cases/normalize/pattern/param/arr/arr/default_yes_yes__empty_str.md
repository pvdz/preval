# Preval test case

# default_yes_yes__empty_str.md

> Normalize > Pattern > Param > Arr > Arr > Default yes yes  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[] = $(['pass2'])] = $(['fail3'])) {
  return 'ok';
}
$(f('', 200));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[] = $([`pass2`])] = tmpParamBare === undefined ? $([`fail3`]) : tmpParamBare;
  return `ok`;
};
$(f(``, 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = [`fail3`];
    bindingPatternArrRoot = $(tmpCalleeParam);
  } else {
    bindingPatternArrRoot = tmpParamBare;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = [`pass2`];
    arrPatternStep = $(tmpCalleeParam$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  return `ok`;
};
const tmpCalleeParam$3 = f(``, 200);
$(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [`pass2`];
const arrPatternStep /*:unknown*/ = $(tmpCalleeParam$1);
[...arrPatternStep];
$(`ok`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "pass2" ];
const b = $( a );
[ ...b ];
$( "ok" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass2']
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope