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
const tmpStringFirstArg /*:unknown*/ = $(`hello`);
const z /*:string*/ = $coerce(tmpStringFirstArg, `string`);
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($coerce($(`hello`), `string`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = $coerce( a, "string" );
$( b );
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
