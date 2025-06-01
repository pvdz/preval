# Preval test case

# ai_rule308_logical_or_short_circuit_true.md

> Ai > Ai3 > Ai rule308 logical or short circuit true
>
> Test: Chained logical OR where an intermediate operation is statically true.

## Input

`````js filename=intro
// Expected: let x = ($('a'), true); $('result', x);
let x = $('a') || true || $('c');
$('result', x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`a`);
if (x) {
  $(`result`, x);
} else {
  $(`result`, true);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`a`);
if (x) {
  $(`result`, x);
} else {
  $(`result`, true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
if (a) {
  $( "result", a );
}
else {
  $( "result", true );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`a`);
if (x) {
  $(`result`, x);
} else {
  x = true;
  if (x) {
    $(`result`, x);
  } else {
    x = $(`c`);
    $(`result`, x);
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'result', 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
