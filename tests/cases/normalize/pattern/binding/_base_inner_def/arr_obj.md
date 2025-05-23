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
const tmpOPBD /*:unknown*/ = $Object_prototype.x;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
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


## PST Settled
With rename=true

`````js filename=intro
const b = $Object_prototype.x;
const c = b === undefined;
if (c) {
  a;
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = {};
const tmpBindingPatternArrRoot = [tmpArrElement];
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const tmpArrPatternStep = tmpArrPatternSplat[0];
const tmpOPBD = tmpArrPatternStep.x;
let x = undefined;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  x = a;
} else {
  x = tmpOPBD;
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


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
