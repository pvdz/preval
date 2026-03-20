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
const tmpCalleeParam /*:object*/ /*truthy*/ = new $error_constructor(`test error`);
const e /*:unknown*/ = $(`e`, tmpCalleeParam);
const tmpCalleeParam$1 /*:unknown*/ = e.message;
const message /*:unknown*/ = $(`message`, tmpCalleeParam$1);
$(`final_message`, message);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`final_message`, $(`message`, $(`e`, new $error_constructor(`test error`)).message));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $error_constructor( "test error" );
const b = $( "e", a );
const c = b.message;
const d = $( "message", c );
$( "final_message", d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = new $error_constructor(`test error`);
let e = $(`e`, tmpCalleeParam);
let message = undefined;
let caughtError = e;
let tmpCalleeParam$1 = caughtError.message;
message = $(`message`, tmpCalleeParam$1);
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
