# Preval test case

# if_false_if_true.md

> Ifelse > Back2back > If false if true
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(false, 'a');
if (x) {
  $(x, 'pass');
  x = $(true, 'b');
}
if (x) {
  $(x, 'hit');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(false, `a`);
if (x) {
  $(x, `pass`);
  const tmpClusterSSA_x /*:unknown*/ = $(true, `b`);
  if (tmpClusterSSA_x) {
    $(tmpClusterSSA_x, `hit`);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(false, `a`);
if (x) {
  $(x, `pass`);
  const tmpClusterSSA_x = $(true, `b`);
  if (tmpClusterSSA_x) {
    $(tmpClusterSSA_x, `hit`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false, "a" );
if (a) {
  $( a, "pass" );
  const b = $( true, "b" );
  if (b) {
    $( b, "hit" );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false, 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
