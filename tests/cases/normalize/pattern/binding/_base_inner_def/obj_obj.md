# Preval test case

# obj_obj.md

> Normalize > Pattern > Binding > Base inner def > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: {y: {z = a }}} = 1;
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $Number_prototype.x;
const tmpOPND$1 /*:unknown*/ = tmpOPND.y;
const tmpOPBD /*:unknown*/ = tmpOPND$1.z;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  a;
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($Number_prototype.x.y.z === undefined) {
  a;
}
`````


## PST Settled
With rename=true

`````js filename=intro
const b = $Number_prototype.x;
const c = b.y;
const d = c.z;
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
const tmpOPND$1 = tmpOPND.y;
const tmpOPBD = tmpOPND$1.z;
let z = undefined;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  z = a;
} else {
  z = tmpOPBD;
}
`````


## Todos triggered


None


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
