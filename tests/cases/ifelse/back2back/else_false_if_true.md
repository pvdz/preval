# Preval test case

# else_false_if_true.md

> Ifelse > Back2back > Else false if true
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(false);
if (x) {
} else {
  $(x, 'pass');
  x = $(true);
}
if (x) {
  $(x, 'hit');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(false);
if (x) {
  $(x, `hit`);
} else {
  $(x, `pass`);
  const tmpClusterSSA_x /*:unknown*/ = $(true);
  if (tmpClusterSSA_x) {
    $(tmpClusterSSA_x, `hit`);
  } else {
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(false);
if (x) {
  $(x, `hit`);
} else {
  $(x, `pass`);
  const tmpClusterSSA_x = $(true);
  if (tmpClusterSSA_x) {
    $(tmpClusterSSA_x, `hit`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  $( a, "hit" );
}
else {
  $( a, "pass" );
  const b = $( true );
  if (b) {
    $( b, "hit" );
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: false, 'pass'
 - 3: true
 - 4: true, 'hit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
