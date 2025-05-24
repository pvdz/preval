# Preval test case

# boolean_not_direct_if_test_arg_fail.md

> If test aliased > Boolean not direct if test arg fail
>
> Alias `a = Boolean(x)` where `x` is NOT the `ifTestName` (`c`).

## Input

`````js filename=intro
// Transformation should NOT occur.
let c = $(true);
let x = $(false);
let a = Boolean(x);
if (c) {
  $(a); // Expected: $(a)
}

// Expected:
// let c = $(true);
// let x = $(false);
// let a = Boolean(x);
// if (c) {
//   $(a);
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
const x /*:unknown*/ = $(false);
if (c) {
  const a /*:boolean*/ = $boolean_constructor(x);
  $(a);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const c = $(true);
const x = $(false);
if (c) {
  $($boolean_constructor(x));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = $( false );
if (a) {
  const c = $boolean_constructor( b );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(true);
let x = $(false);
let a = $boolean_constructor(x);
if (c) {
  $(a);
} else {
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
