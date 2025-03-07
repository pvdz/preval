# Preval test case

# if_true_else_false.md

> Ifelse > Back2back > If true else false
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(true, 'a');
if (x) {
  $(x, 'pass');
  x = $(false, 'b');
}
if (x) {
} else {
  $(x, 'hit');
}
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(true, `a`);
if (x) {
  $(x, `pass`);
  const tmpClusterSSA_x /*:unknown*/ = $(false, `b`);
  if (tmpClusterSSA_x) {
  } else {
    $(tmpClusterSSA_x, `hit`);
  }
} else {
  $(x, `hit`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(true, `a`);
if (x) {
  $(x, `pass`);
  const tmpClusterSSA_x = $(false, `b`);
  if (!tmpClusterSSA_x) {
    $(tmpClusterSSA_x, `hit`);
  }
} else {
  $(x, `hit`);
}
`````

## Pre Normal


`````js filename=intro
let x = $(true, `a`);
if (x) {
  $(x, `pass`);
  x = $(false, `b`);
}
if (x) {
} else {
  $(x, `hit`);
}
`````

## Normalized


`````js filename=intro
let x = $(true, `a`);
if (x) {
  $(x, `pass`);
  x = $(false, `b`);
  if (x) {
  } else {
    $(x, `hit`);
  }
} else {
  $(x, `hit`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true, "a" );
if (a) {
  $( a, "pass" );
  const b = $( false, "b" );
  if (b) {

  }
  else {
    $( b, "hit" );
  }
}
else {
  $( a, "hit" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true, 'a'
 - 2: true, 'pass'
 - 3: false, 'b'
 - 4: false, 'hit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
