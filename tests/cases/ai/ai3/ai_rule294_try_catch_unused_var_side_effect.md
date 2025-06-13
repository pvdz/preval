# Preval test case

# ai_rule294_try_catch_unused_var_side_effect.md

> Ai > Ai3 > Ai rule294 try catch unused var side effect
>
> Test: try...catch where the catch variable is unused but the catch block has side effects.

## Input

`````js filename=intro
// Expected: try { throw x; } catch { $('side_effect'); } (or equivalent)
let x = $('x', new Error('test_error'));
try {
  throw x;
} catch (unusedError) {
  $('side_effect_in_catch');
}
$('after_try_catch');
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = new $error_constructor(`test_error`);
const x /*:unknown*/ = $(`x`, tmpCalleeParam);
try {
  throw x;
} catch (unusedError) {
  $(`side_effect_in_catch`);
}
$(`after_try_catch`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`x`, new $error_constructor(`test_error`));
try {
  throw x;
} catch (unusedError) {
  $(`side_effect_in_catch`);
}
$(`after_try_catch`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $error_constructor( "test_error" );
const b = $( "x", a );
try {
  throw b;
}
catch (c) {
  $( "side_effect_in_catch" );
}
$( "after_try_catch" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = new $error_constructor(`test_error`);
let x = $(`x`, tmpCalleeParam);
try {
  throw x;
} catch (unusedError) {
  $(`side_effect_in_catch`);
}
$(`after_try_catch`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x', {}
 - 2: 'side_effect_in_catch'
 - 3: 'after_try_catch'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
