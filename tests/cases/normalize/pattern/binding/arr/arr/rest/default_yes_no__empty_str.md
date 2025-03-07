# Preval test case

# default_yes_no__empty_str.md

> Normalize > Pattern > Binding > Arr > Arr > Rest > Default yes no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[...x] = $('pass')] = '';
$(x);
`````

## Settled


`````js filename=intro
const arrPatternStep /*:unknown*/ = $(`pass`);
const arrPatternSplat$1 /*:array*/ = [...arrPatternStep];
const x /*:array*/ = arrPatternSplat$1.slice(0);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arrPatternStep = $(`pass`);
$([...arrPatternStep].slice(0));
`````

## Pre Normal


`````js filename=intro
const [[...x] = $(`pass`)] = ``;
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = ``;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  arrPatternStep = $(`pass`);
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
const a = $( "pass" );
const b = [ ...a ];
const c = b.slice( 0 );
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'pass'
 - 2: ['p', 'a', 's', 's']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice