# Preval test case

# arr_obj.md

> Normalize > Pattern > Binding > Base inner def > Arr obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [{ x = a }] = [{}];
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = $Object_prototype.x;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  a;
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($Object_prototype.x === undefined) {
  a;
}
`````

## Pre Normal


`````js filename=intro
const [{ x: x = a }] = [{}];
`````

## Normalized


`````js filename=intro
const tmpArrElement = {};
const bindingPatternArrRoot = [tmpArrElement];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = a;
} else {
  x = objPatternBeforeDefault;
}
`````

## PST Settled
With rename=true

`````js filename=intro
const b = $Object_prototype.x;
const c = b === undefined;
if (c) {
  a;
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
