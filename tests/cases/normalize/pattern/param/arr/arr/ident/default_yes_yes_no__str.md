# Preval test case

# default_yes_yes_no__str.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['fail2'])]) {
  return x;
}
$(f('abc', 200));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[x = $(`fail`)] = $([`fail2`])] = tmpParamBare;
  return x;
};
$(f(`abc`, 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = [`fail2`];
    arrPatternStep = $(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    x = $(`fail`);
    return x;
  } else {
    x = arrPatternBeforeDefault$1;
    return x;
  }
};
const tmpCalleeParam$1 = f(`abc`, 200);
$(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
$(`a`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "a" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope