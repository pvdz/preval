# Preval test case

# oneper_after3.md

> Normalize > Branching > Single branching > Oneper after3
>
> One branch per func?

B is now prevented from being inlined (at least at the time of writing).
C was not being inlined despite being called once.

## Input

`````js filename=intro
const A = function () {
  const x = $();
  if (x) {
    const tmp = B();
    return tmp;
  } else {
    const tmp = B()
    return tmp;
  }
}
const B = function () {
  $();
  const tmp = C();
  return tmp;
}
const C = function () {
  const x = $();
  if (x) {
    const tmp = $();
    return tmp;
  }
}
A();
`````


## Settled


`````js filename=intro
$();
$();
const x$1 /*:unknown*/ = $();
if (x$1) {
  $();
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
$();
if ($()) {
  $();
}
`````


## PST Settled
With rename=true

`````js filename=intro
$();
$();
const a = $();
if (a) {
  $();
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 
 - 3: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
