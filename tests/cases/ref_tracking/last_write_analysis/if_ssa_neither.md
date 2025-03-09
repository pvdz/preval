# Preval test case

# if_ssa_neither.md

> Ref tracking > Last write analysis > If ssa neither
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

## Input

`````js filename=intro
let x = $('a');
$(x);
// This write should be SSA'd because the `if` has no write
x = $('b');
if ($) {
  $('xyz');
}
$(x);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(`a`);
$(x);
const tmpClusterSSA_x /*:unknown*/ = $(`b`);
if ($) {
  $(`xyz`);
  $(tmpClusterSSA_x);
} else {
  $(tmpClusterSSA_x);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`a`));
const tmpClusterSSA_x = $(`b`);
if ($) {
  $(`xyz`);
  $(tmpClusterSSA_x);
} else {
  $(tmpClusterSSA_x);
}
`````

## Pre Normal


`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
if ($) {
  $(`xyz`);
}
$(x);
`````

## Normalized


`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
if ($) {
  $(`xyz`);
  $(x);
} else {
  $(x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
$( a );
const b = $( "b" );
if ($) {
  $( "xyz" );
  $( b );
}
else {
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'b'
 - 4: 'xyz'
 - 5: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
