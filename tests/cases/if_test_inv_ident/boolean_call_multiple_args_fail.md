# Preval test case

# boolean_call_multiple_args_fail.md

> If test inv ident > Boolean call multiple args fail
>
> Alias `a = Boolean(c, d)`. This is valid JS (uses first arg).

## Input

`````js filename=intro
// However, our rule requires `Boolean(ifTestName)` with exactly one argument.
// Transformation should NOT occur.
let c = $(true);
let d = $(false);
let a = Boolean(c, d);
if (c) {
  $(a); // Expected: $(a)
}

// Expected:
// let c = $(true);
// let d = $(false);
// let a = Boolean(c, d);
// if (c) {
//   $(a);
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
$(false);
if (c) {
  $(true);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const c = $(true);
$(false);
if (c) {
  $(true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
$( false );
if (a) {
  $( true );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(true);
let d = $(false);
const tmpCompObj = [c];
const tmpArgOverflow = c;
let a = $boolean_constructor(c);
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
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
