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
const objPatternBeforeDefault /*:unknown*/ = $Number_prototype.x;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = b;
} else {
  x = objPatternBeforeDefault;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = $Number_prototype.x;
if (objPatternBeforeDefault === undefined) {
  x = b;
} else {
  x = objPatternBeforeDefault;
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
