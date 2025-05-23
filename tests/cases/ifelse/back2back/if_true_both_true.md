# Preval test case

# if_true_both_true.md

> Ifelse > Back2back > If true both true
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(true, 'a');
if (x) {
  $(x, 'pass');
  x = $(true, 'b');
}
if (x) {
  $(x, 'one');
} else {
  $(x, 'two');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true, `a`);
if (x) {
  $(x, `pass`);
  const tmpClusterSSA_x /*:unknown*/ = $(true, `b`);
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
const x = $(true, `a`);
if (x) {
  $(x, `pass`);
  const tmpClusterSSA_x = $(true, `b`);
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
const a = $( true, "a" );
if (a) {
  $( a, "pass" );
  const b = $( true, "b" );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(true, `a`);
if (x) {
  $(x, `pass`);
  x = $(true, `b`);
  if (x) {
    $(x, `one`);
  } else {
    $(x, `two`);
  }
} else {
  $(x, `two`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true, 'a'
 - 2: true, 'pass'
 - 3: true, 'b'
 - 4: true, 'one'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
