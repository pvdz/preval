# Preval test case

# else_true_else_true.md

> Ifelse > Back2back > Else true else true
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(1);
if (x) {
} else {
  $(x, 'pass');
  x = $(1);
}
if (x) {
} else {
  $(x, 'hit');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
if (x) {
} else {
  $(x, `pass`);
  const tmpClusterSSA_x /*:unknown*/ = $(1);
  if (tmpClusterSSA_x) {
  } else {
    $(tmpClusterSSA_x, `hit`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
if (!x) {
  $(x, `pass`);
  const tmpClusterSSA_x = $(1);
  if (!tmpClusterSSA_x) {
    $(tmpClusterSSA_x, `hit`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {

}
else {
  $( a, "pass" );
  const b = $( 1 );
  if (b) {

  }
  else {
    $( b, "hit" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(1);
if (x) {
} else {
  $(x, `pass`);
  x = $(1);
  if (x) {
  } else {
    $(x, `hit`);
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
