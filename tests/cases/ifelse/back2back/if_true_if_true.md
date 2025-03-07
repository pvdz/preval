# Preval test case

# if_true_if_true.md

> Ifelse > Back2back > If true if true
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
  $(x, 'hit');
}
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(true, `a`);
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
const x = $(true, `a`);
if (x) {
  $(x, `pass`);
  const tmpClusterSSA_x = $(true, `b`);
  if (tmpClusterSSA_x) {
    $(tmpClusterSSA_x, `hit`);
  }
}
`````

## Pre Normal


`````js filename=intro
let x = $(true, `a`);
if (x) {
  $(x, `pass`);
  x = $(true, `b`);
}
if (x) {
  $(x, `hit`);
}
`````

## Normalized


`````js filename=intro
let x = $(true, `a`);
if (x) {
  $(x, `pass`);
  x = $(true, `b`);
  if (x) {
    $(x, `hit`);
  } else {
  }
} else {
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
    $( b, "hit" );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true, 'a'
 - 2: true, 'pass'
 - 3: true, 'b'
 - 4: true, 'hit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
