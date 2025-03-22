# Preval test case

# obj.md

> Normalize > Pattern > Binding > Base inner def > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const { x = b } = 1;
`````


## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = (1).x;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  b;
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ((1).x === undefined) {
  b;
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = (1).x;
const c = a === undefined;
if (c) {
  b;
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

b


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
