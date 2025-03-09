# Preval test case

# if_ssa_both.md

> Ref tracking > Last write analysis > If ssa both
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

## Input

`````js filename=intro
let x = $('a');
$(x);
// This write can not be observed and should be eliminated
x = $('b');
if ($) {
  // This binding, together with the next one, should be SSAd (together)
  x = $('c');
} else {
  // This binding, together with the next one, should be SSAd (together)
  x = $('d');
}
$('break if hoisting optimization ooops');
$(x);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(`a`);
$(x);
$(`b`);
if ($) {
  const tmpClusterSSA_x /*:unknown*/ = $(`c`);
  $(`break if hoisting optimization ooops`);
  $(tmpClusterSSA_x);
} else {
  const tmpClusterSSA_x$1 /*:unknown*/ = $(`d`);
  $(`break if hoisting optimization ooops`);
  $(tmpClusterSSA_x$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`a`));
$(`b`);
if ($) {
  const tmpClusterSSA_x = $(`c`);
  $(`break if hoisting optimization ooops`);
  $(tmpClusterSSA_x);
} else {
  const tmpClusterSSA_x$1 = $(`d`);
  $(`break if hoisting optimization ooops`);
  $(tmpClusterSSA_x$1);
}
`````

## Pre Normal


`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
if ($) {
  x = $(`c`);
} else {
  x = $(`d`);
}
$(`break if hoisting optimization ooops`);
$(x);
`````

## Normalized


`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
if ($) {
  x = $(`c`);
  $(`break if hoisting optimization ooops`);
  $(x);
} else {
  x = $(`d`);
  $(`break if hoisting optimization ooops`);
  $(x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
$( a );
$( "b" );
if ($) {
  const b = $( "c" );
  $( "break if hoisting optimization ooops" );
  $( b );
}
else {
  const c = $( "d" );
  $( "break if hoisting optimization ooops" );
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
 - 4: 'c'
 - 5: 'break if hoisting optimization ooops'
 - 6: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
