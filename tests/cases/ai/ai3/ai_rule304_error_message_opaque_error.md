# Preval test case

# ai_rule304_error_message_opaque_error.md

> Ai > Ai3 > Ai rule304 error message opaque error
>
> Test: Accessing error.message when the error object itself is an opaque value.

## Input

`````js filename=intro
// Expected: err.message access preserved.
let e = $('e', new Error("test error"));
let message;
try {
  throw e;
} catch (caughtError) {
  message = $('message', caughtError.message);
}
$('final_message', message);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = new Error(`test error`);
const e /*:unknown*/ = $(`e`, tmpCalleeParam);
let message /*:unknown*/ = undefined;
try {
  throw e;
} catch (caughtError) {
  const tmpCalleeParam$1 /*:unknown*/ = caughtError.message;
  message = $(`message`, tmpCalleeParam$1);
}
$(`final_message`, message);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const e = $(`e`, new Error(`test error`));
let message = undefined;
try {
  throw e;
} catch (caughtError) {
  message = $(`message`, caughtError.message);
}
$(`final_message`, message);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new Error( "test error" );
const b = $( "e", a );
let c = undefined;
try {
  throw b;
}
catch (d) {
  const e = d.message;
  c = $( "message", e );
}
$( "final_message", c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = new Error(`test error`);
let e = $(`e`, tmpCalleeParam);
let message = undefined;
try {
  throw e;
} catch (caughtError) {
  let tmpCalleeParam$1 = caughtError.message;
  message = $(`message`, tmpCalleeParam$1);
}
$(`final_message`, message);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'e', {}
 - 2: 'message', undefined
 - 3: 'final_message', 'message'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
