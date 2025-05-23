# Preval test case

# obj_obj.md

> Normalize > Pattern > Assignment > Base inner def > Obj obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({x: {y: {z = a }}} = 1);
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $Number_prototype.x;
const tmpOPND$1 /*:unknown*/ = tmpOPND.y;
const tmpOPBD /*:unknown*/ = tmpOPND$1.z;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  z = a;
} else {
  z = tmpOPBD;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $Number_prototype.x.y.z;
if (tmpOPBD === undefined) {
  z = a;
} else {
  z = tmpOPBD;
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
  z = a;
}
else {
  z = d;
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = 1;
const tmpOPND = tmpAssignObjPatternRhs.x;
const tmpOPND$1 = tmpOPND.y;
const tmpOPBD = tmpOPND$1.z;
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


BAD@! Found 2 implicit global bindings:

a, z


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
