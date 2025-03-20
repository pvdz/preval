# Preval test case

# arr_obj.md

> Normalize > Pattern > Assignment > Base inner def > Arr obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
var x, a = 100;
([{ x = a }] = [{}]);
$(x, a);
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = $Object_prototype.x;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  $(100, 100);
} else {
  $(objPatternBeforeDefault, 100);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = $Object_prototype.x;
if (objPatternBeforeDefault === undefined) {
  $(100, 100);
} else {
  $(objPatternBeforeDefault, 100);
}
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let x = undefined;
a = 100;
[{ x: x = a }] = [{}];
$(x, a);
`````

## Normalized


`````js filename=intro
let a = undefined;
let x = undefined;
a = 100;
const tmpArrElement = {};
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = a;
  $(a, a);
} else {
  x = objPatternBeforeDefault;
  $(objPatternBeforeDefault, a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
const b = a === undefined;
if (b) {
  $( 100, 100 );
}
else {
  $( a, 100 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100, 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
