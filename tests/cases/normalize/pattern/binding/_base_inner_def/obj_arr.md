# Preval test case

# obj_arr.md

> Normalize > Pattern > Binding > Base inner def > Obj arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: [ y = a ]} = 1;
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $Number_prototype.x;
const tmpArrPatternSplat /*:array*/ = [...tmpOPND];
const tmpAPBD /*:unknown*/ = tmpArrPatternSplat[0];
const tmpIfTest /*:boolean*/ = tmpAPBD === undefined;
if (tmpIfTest) {
  a;
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPND = $Number_prototype.x;
if ([...tmpOPND][0] === undefined) {
  a;
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
  a;
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternObjRoot = 1;
const tmpOPND = tmpBindingPatternObjRoot.x;
const tmpArrPatternSplat = [...tmpOPND];
const tmpAPBD = tmpArrPatternSplat[0];
let y = undefined;
const tmpIfTest = tmpAPBD === undefined;
if (tmpIfTest) {
  y = a;
} else {
  y = tmpAPBD;
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 1 implicit global bindings:

a


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
