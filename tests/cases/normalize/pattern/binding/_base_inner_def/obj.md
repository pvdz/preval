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
const tmpOPBD /*:unknown*/ = $Number_prototype.x;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  b;
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($Number_prototype.x === undefined) {
  b;
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.x;
const c = a === undefined;
if (c) {
  b;
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternObjRoot = 1;
const tmpOPBD = tmpBindingPatternObjRoot.x;
let x = undefined;
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


BAD@! Found 1 implicit global bindings:

b


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
