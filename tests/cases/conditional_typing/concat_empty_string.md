# Preval test case

# concat_empty_string.md

> Conditional typing > Concat empty string
>
> Concatting an empty string to a known string is a noop

Like coercion but the type is already there.

## Input

`````js filename=intro
const x = String($('hello'));
const y = x + '';
const z = y + '';
$(z);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`hello`);
const z /*:string*/ = $coerce(tmpCalleeParam, `string`);
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(String($(`hello`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = $coerce( a, "string" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $(`hello`);
const x = $coerce(tmpCalleeParam, `string`);
const y = $coerce(x, `plustr`);
const z = $coerce(y, `plustr`);
$(z);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
