# Preval test case

# if_false_both_false.md

> Ifelse > Back2back > If false both false
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(false, 'a');
if (x) {
  $(x, 'pass');
  x = $(false, 'b');
}
if (x) {
  $(x, 'one');
} else {
  $(x, 'two');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(false, `a`);
if (x) {
  $(x, `pass`);
  const tmpClusterSSA_x /*:unknown*/ = $(false, `b`);
  if (tmpClusterSSA_x) {
    $(tmpClusterSSA_x, `one`);
  } else {
    $(tmpClusterSSA_x, `two`);
  }
} else {
  $(x, `two`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(false, `a`);
if (x) {
  $(x, `pass`);
  const tmpClusterSSA_x = $(false, `b`);
  if (tmpClusterSSA_x) {
    $(tmpClusterSSA_x, `one`);
  } else {
    $(tmpClusterSSA_x, `two`);
  }
} else {
  $(x, `two`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false, "a" );
if (a) {
  $( a, "pass" );
  const b = $( false, "b" );
  if (b) {
    $( b, "one" );
  }
  else {
    $( b, "two" );
  }
}
else {
  $( a, "two" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false, 'a'
 - 2: false, 'two'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
