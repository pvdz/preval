# Preval test case

# obj_arr.md

> Normalize > Pattern > Assignment > Base inner def > Obj arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({x: [ y = a ]} = 1);
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $Number_prototype.x;
const tmpArrPatternSplat /*:array*/ = [...tmpOPND];
const tmpAPBD /*:unknown*/ = tmpArrPatternSplat[0];
const tmpIfTest /*:boolean*/ = tmpAPBD === undefined;
if (tmpIfTest) {
  y = a;
} else {
  y = tmpAPBD;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPND = $Number_prototype.x;
const tmpAPBD = [...tmpOPND][0];
if (tmpAPBD === undefined) {
  y = a;
} else {
  y = tmpAPBD;
}
`````


## PST Settled
With rename=true

`````js filename=intro
const b = $Number_prototype.x;
const c = [ ...b ];
const d = c[ 0 ];
const e = d === undefined;
if (e) {
  y = a;
}
else {
  y = d;
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 2 implicit global bindings:

a, y


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
