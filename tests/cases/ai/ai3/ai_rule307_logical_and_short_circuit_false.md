# Preval test case

# ai_rule307_logical_and_short_circuit_false.md

> Ai > Ai3 > Ai rule307 logical and short circuit false
>
> Test: Chained logical AND where an intermediate operation is statically false.

## Input

`````js filename=intro
// Expected: let x = ($('a'), false); $('result', x);
let x = $('a') && false && $('c');
$('result', x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`a`);
if (x) {
  $(`result`, false);
} else {
  $(`result`, x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`a`);
if (x) {
  $(`result`, false);
} else {
  $(`result`, x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
if (a) {
  $( "result", false );
}
else {
  $( "result", a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`a`);
if (x) {
  x = false;
  if (x) {
    x = $(`c`);
    $(`result`, x);
  } else {
    $(`result`, x);
  }
} else {
  $(`result`, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'result', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
