# Preval test case

# ai_try_dollar_catch_rethrow.md

> Ai > Ai1 > Ai try dollar catch rethrow
>
> Test: try-catch where try contains only $() and catch re-throws.

## Input

`````js filename=intro
// Expected: try { $('A'); } catch (e) { $('B'); throw e; } $('C');
try {
  $('A');
} catch (e) {
  $('B');
  throw e;
}
$('C');
`````


## Settled


`````js filename=intro
try {
  $(`A`);
} catch (e) {
  $(`B`);
  throw e;
}
$(`C`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(`A`);
} catch (e) {
  $(`B`);
  throw e;
}
$(`C`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( "A" );
}
catch (a) {
  $( "B" );
  throw a;
}
$( "C" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  $(`A`);
} catch (e) {
  $(`B`);
  throw e;
}
$(`C`);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A'
 - 2: 'C'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
