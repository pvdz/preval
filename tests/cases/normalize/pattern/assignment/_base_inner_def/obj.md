# Preval test case

# obj.md

> Normalize > Pattern > Assignment > Base inner def > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x = b } = 1);
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $Number_prototype.x;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  x = b;
} else {
  x = tmpOPBD;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $Number_prototype.x;
if (tmpOPBD === undefined) {
  x = b;
} else {
  x = tmpOPBD;
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.x;
const c = a === undefined;
if (c) {
  x = b;
}
else {
  x = a;
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = 1;
const tmpOPBD = tmpAssignObjPatternRhs.x;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  x = b;
} else {
  x = tmpOPBD;
}
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

b, x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
