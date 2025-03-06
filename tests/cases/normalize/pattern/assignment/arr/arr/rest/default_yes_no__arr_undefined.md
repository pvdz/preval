# Preval test case

# default_yes_no__arr_undefined.md

> Normalize > Pattern > Assignment > Arr > Arr > Rest > Default yes no  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[...x] = $('pass')] = [undefined, 4, 5]);
$(x);
`````

## Pre Normal


`````js filename=intro
[[...x] = $(`pass`)] = [undefined, 4, 5];
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = [undefined, 4, 5];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  arrPatternStep = $(`pass`);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
x = arrPatternSplat$1.slice(0);
$(x);
`````

## Output


`````js filename=intro
const arrPatternStep /*:unknown*/ = $(`pass`);
const arrPatternSplat$1 /*:array*/ = [...arrPatternStep];
x = arrPatternSplat$1.slice(0);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "pass" );
const b = [ ...a ];
x = b.slice( 0 );
$( x );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice