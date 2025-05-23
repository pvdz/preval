# Preval test case

# oneper_after2.md

> Normalize > Branching > Single branching > Oneper after2
>
> One branch per func?

B was not being inlined despite being a trampoline.
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
if ($()) {
  $();
}
`````


## PST Settled
With rename=true

`````js filename=intro
$();
const a = $();
if (a) {
  $();
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const A = function () {
  debugger;
  const x = $();
  if (x) {
    const tmp = B();
    return tmp;
  } else {
    const tmp$1 = B();
    return tmp$1;
  }
};
const B = function () {
  debugger;
  const tmp$3 = C();
  return tmp$3;
};
const C = function () {
  debugger;
  const x$1 = $();
  if (x$1) {
    const tmp$5 = $();
    return tmp$5;
  } else {
    return undefined;
  }
};
A();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
