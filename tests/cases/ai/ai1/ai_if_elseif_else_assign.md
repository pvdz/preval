# Preval test case

# ai_if_elseif_else_assign.md

> Ai > Ai1 > Ai if elseif else assign
>
> Test: if-else if-else chain with opaque conditions and assignment.

## Input

`````js filename=intro
// Expected: (Structure preserved, x gets correct value based on path)
let x;
if ($('C1')) {
  x = $('V1');
} else if ($('C2')) {
  x = $('V2');
} else {
  x = $('V3');
}
$('use', x);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(`C1`);
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(`V1`);
  $(`use`, tmpClusterSSA_x);
} else {
  const tmpIfTest$1 /*:unknown*/ = $(`C2`);
  if (tmpIfTest$1) {
    const tmpClusterSSA_x$1 /*:unknown*/ = $(`V2`);
    $(`use`, tmpClusterSSA_x$1);
  } else {
    const tmpClusterSSA_x$3 /*:unknown*/ = $(`V3`);
    $(`use`, tmpClusterSSA_x$3);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`C1`)) {
  $(`use`, $(`V1`));
} else {
  if ($(`C2`)) {
    $(`use`, $(`V2`));
  } else {
    $(`use`, $(`V3`));
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "C1" );
if (a) {
  const b = $( "V1" );
  $( "use", b );
}
else {
  const c = $( "C2" );
  if (c) {
    const d = $( "V2" );
    $( "use", d );
  }
  else {
    const e = $( "V3" );
    $( "use", e );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpIfTest = $(`C1`);
if (tmpIfTest) {
  x = $(`V1`);
  $(`use`, x);
} else {
  const tmpIfTest$1 = $(`C2`);
  if (tmpIfTest$1) {
    x = $(`V2`);
    $(`use`, x);
  } else {
    x = $(`V3`);
    $(`use`, x);
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'C1'
 - 2: 'V1'
 - 3: 'use', 'V1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
