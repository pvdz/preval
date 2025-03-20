# Preval test case

# default_yes_no_no__str.md

> Normalize > Pattern > Binding > Arr > Arr > Ident > Default yes no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[x = $('fail')]] = 'abc';
$(x);
`````

## Settled


`````js filename=intro
$(`a`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`);
`````

## Pre Normal


`````js filename=intro
const [[x = $(`fail`)]] = `abc`;
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = `abc`;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault = arrPatternSplat$1[0];
let x = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`fail`);
  $(x);
} else {
  x = arrPatternBeforeDefault;
  $(arrPatternBeforeDefault);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( "a" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
