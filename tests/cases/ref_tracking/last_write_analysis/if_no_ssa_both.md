# Preval test case

# if_no_ssa_both.md

> Ref tracking > Last write analysis > If no ssa both
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

## Input

`````js filename=intro
let x = $('a');
$(x);
if ($) {
  x = $('b');
} else {
  x = $('c');
}
// Read should reach two writes. No SSA possible (unless transformed to allow it)
$(x);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(`a`);
$(x);
if ($) {
  const tmpClusterSSA_x /*:unknown*/ = $(`b`);
  $(tmpClusterSSA_x);
} else {
  const tmpClusterSSA_x$1 /*:unknown*/ = $(`c`);
  $(tmpClusterSSA_x$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`a`));
if ($) {
  $($(`b`));
} else {
  $($(`c`));
}
`````

## Pre Normal


`````js filename=intro
let x = $(`a`);
$(x);
if ($) {
  x = $(`b`);
} else {
  x = $(`c`);
}
$(x);
`````

## Normalized


`````js filename=intro
let x = $(`a`);
$(x);
if ($) {
  x = $(`b`);
  $(x);
} else {
  x = $(`c`);
  $(x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
$( a );
if ($) {
  const b = $( "b" );
  $( b );
}
else {
  const c = $( "c" );
  $( c );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'b'
 - 4: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
