# Preval test case

# multiple_args_implicit_global.md

> Global casting > Number > Multiple args implicit global
>
> Calling global constructors to cast when the call is redundant should be eliminated

## Input

`````js filename=intro
const a = $('a');
const x = +a;
const y = Number(x, $, 1, fail_hard, "twee");
$(y);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`a`);
const tmpArgOverflow /*:number*/ = +a;
fail_hard;
$(tmpArgOverflow);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(`a`);
const tmpArgOverflow = +a;
fail_hard;
$(tmpArgOverflow);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = +a;
fail_hard;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(`a`);
const x = +a;
const tmpArgOverflow = x;
fail_hard;
const y = $coerce(tmpArgOverflow, `number`);
$(y);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

fail_hard


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
