# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Binding > Arr > Obj > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{}] = 'abc';
$('bad');
`````

## Settled


`````js filename=intro
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`bad`);
`````

## Pre Normal


`````js filename=intro
const [{}] = `abc`;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = `abc`;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
let objPatternCrashTest = arrPatternStep === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep.cannotDestructureThis;
  $(`bad`);
} else {
  $(`bad`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( "bad" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'bad'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
