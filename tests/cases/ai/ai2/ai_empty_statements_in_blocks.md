# Preval test case

# ai_empty_statements_in_blocks.md

> Ai > Ai2 > Ai empty statements in blocks
>
> Test: Empty statements and blocks with only empty statements.

## Input

`````js filename=intro
// Expected: Empty statements are removed or preserved harmlessly.
$('start');;
{ ; ; ; }
if ($('cond', true)) { ; } else { ; $('else_empty'); }
$('end');
`````


## Settled


`````js filename=intro
$(`start`);
const tmpIfTest /*:unknown*/ = $(`cond`, true);
if (tmpIfTest) {
  $(`end`);
} else {
  $(`else_empty`);
  $(`end`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`start`);
if ($(`cond`, true)) {
  $(`end`);
} else {
  $(`else_empty`);
  $(`end`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( "start" );
const a = $( "cond", true );
if (a) {
  $( "end" );
}
else {
  $( "else_empty" );
  $( "end" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`start`);
const tmpIfTest = $(`cond`, true);
if (tmpIfTest) {
  $(`end`);
} else {
  $(`else_empty`);
  $(`end`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'start'
 - 2: 'cond', true
 - 3: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
