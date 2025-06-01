# Preval test case

# ai_merge_sequential_identical_ifs.md

> Ai > Ai1 > Ai merge sequential identical ifs
>
> Test: Merging sequential if statements with the same, unchanged simple condition variable.

## Input

`````js filename=intro
// Expected: let cond = $('C'); let x = 0; if (cond) { x = $('val1', 1); x = $('val2', 2); } $('out', x);
// Alternate Expected (if x=$('val1',1) is DCE'd): let cond = $('C'); let x = 0; if (cond) { x = $('val2', 2); } $('out', x);
let cond = $('C');
let x = 0;
if (cond) {
  x = $('val1', 1);
}
// cond is not reassigned here
if (cond) {
  x = $('val2', 2);
}
$('out', x);
`````


## Settled


`````js filename=intro
const cond /*:unknown*/ = $(`C`);
if (cond) {
  $(`val1`, 1);
  const tmpClusterSSA_x$1 /*:unknown*/ = $(`val2`, 2);
  $(`out`, tmpClusterSSA_x$1);
} else {
  $(`out`, 0);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`C`)) {
  $(`val1`, 1);
  $(`out`, $(`val2`, 2));
} else {
  $(`out`, 0);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "C" );
if (a) {
  $( "val1", 1 );
  const b = $( "val2", 2 );
  $( "out", b );
}
else {
  $( "out", 0 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let cond = $(`C`);
let x = 0;
if (cond) {
  x = $(`val1`, 1);
  if (cond) {
    x = $(`val2`, 2);
    $(`out`, x);
  } else {
    $(`out`, x);
  }
} else {
  $(`out`, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'C'
 - 2: 'val1', 1
 - 3: 'val2', 2
 - 4: 'out', 'val2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
