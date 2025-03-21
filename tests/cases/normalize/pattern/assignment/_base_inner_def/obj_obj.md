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
const objPatternNoDefault /*:unknown*/ = (1).x;
const objPatternNoDefault$1 /*:unknown*/ = objPatternNoDefault.y;
const objPatternBeforeDefault /*:unknown*/ = objPatternNoDefault$1.z;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  z = a;
} else {
  z = objPatternBeforeDefault;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = (1).x.y.z;
if (objPatternBeforeDefault === undefined) {
  z = a;
} else {
  z = objPatternBeforeDefault;
}
`````


## PST Settled
With rename=true

`````js filename=intro
const b = 1.x;
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
