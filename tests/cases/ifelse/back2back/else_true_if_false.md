# Preval test case

# else_true_if_false.md

> Ifelse > Back2back > Else true if false
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(true, 'a');
if (x) {
} else {
  $(x, 'pass');
  x = $(false, 'b');
}
if (x) {
  $(x, 'hit');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true, `a`);
if (x) {
  $(x, `hit`);
} else {
  $(x, `pass`);
  const tmpClusterSSA_x /*:unknown*/ = $(false, `b`);
  if (tmpClusterSSA_x) {
    $(tmpClusterSSA_x, `hit`);
  } else {
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(true, `a`);
if (x) {
  $(x, `hit`);
} else {
  $(x, `pass`);
  const tmpClusterSSA_x = $(false, `b`);
  if (tmpClusterSSA_x) {
    $(tmpClusterSSA_x, `hit`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true, "a" );
if (a) {
  $( a, "hit" );
}
else {
  $( a, "pass" );
  const b = $( false, "b" );
  if (b) {
    $( b, "hit" );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true, 'a'
 - 2: true, 'hit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
