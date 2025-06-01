# Preval test case

# ai_rule311_while_opaque_cond_break.md

> Ai > Ai4 > Ai rule311 while opaque cond break
>
> Test: Loop with opaque condition but unconditional break in first iteration.

## Input

`````js filename=intro
// Expected: $('before_break'); $('after_loop');
while ($('cond')) {
  $('before_break');
  break;
  $('after_break_unreachable');
}
$('after_loop');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(`cond`);
if (tmpIfTest) {
  $(`before_break`);
  $(`after_loop`);
} else {
  $(`after_loop`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`cond`)) {
  $(`before_break`);
  $(`after_loop`);
} else {
  $(`after_loop`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "cond" );
if (a) {
  $( "before_break" );
  $( "after_loop" );
}
else {
  $( "after_loop" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  const tmpIfTest = $(`cond`);
  if (tmpIfTest) {
    $(`before_break`);
    break;
  } else {
    break;
  }
}
$(`after_loop`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond'
 - 2: 'before_break'
 - 3: 'after_loop'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
