# Preval test case

# default_yes_no__arr_str.md

> Normalize > Pattern > Binding > Arr > Arr > Rest > Default yes no  arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[...x] = $('fail')] = ['abc', 4, 5];
$(x);
`````

## Settled


`````js filename=intro
const x /*:array*/ = [`a`, `b`, `c`];
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`a`, `b`, `c`]);
`````

## Pre Normal


`````js filename=intro
const [[...x] = $(`fail`)] = [`abc`, 4, 5];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [`abc`, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  arrPatternStep = $(`fail`);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1.slice(0);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c" ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['a', 'b', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice
