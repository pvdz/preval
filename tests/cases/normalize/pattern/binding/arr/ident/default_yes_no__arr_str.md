# Preval test case

# default_yes_no__arr_str.md

> Normalize > Pattern > Binding > Arr > Ident > Default yes no  arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [x = $('pass')] = ['abc', 201];
$(x);
`````

## Settled


`````js filename=intro
$(`abc`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc`);
`````

## Pre Normal


`````js filename=intro
const [x = $(`pass`)] = [`abc`, 201];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [`abc`, 201];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let x = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`pass`);
  $(x);
} else {
  x = arrPatternBeforeDefault;
  $(arrPatternBeforeDefault);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( "abc" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
