# Preval test case

# boolean_both_branches.md

> If test aliased > Boolean both branches
>
> Alias `a = Boolean(c)` used in both consequent and alternate branches.

## Input

`````js filename=intro
// `a` becomes `true` in consequent, `false` in alternate.
let c = $(true); // Test runner will flip for full coverage
let a = Boolean(c);
if (c) {
  $(a); // Expected: $(true)
} else {
  $(a); // Expected: $(false)
}

// Expected (if c is initially true):
// let c = $(true);
// let a = Boolean(c);
// if (c) {
//   $(true);
// } else {
//   $(false); // Path not hit
// }

// Expected (if c is initially false):
// let c = $(false);
// let a = Boolean(c);
// if (c) {
//   $(true); // Path not hit
// } else {
//   $(false);
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
const tmpBool /*:boolean*/ = $boolean_constructor(c);
$(tmpBool);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($boolean_constructor($(true)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = $boolean_constructor( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(true);
let a = $boolean_constructor(c);
if (c) {
  $(a);
} else {
  $(a);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
