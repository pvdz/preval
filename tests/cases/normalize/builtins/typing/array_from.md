# Preval test case

# array_from.md

> Normalize > Builtins > Typing > Array from
>
> Should adhere to the `returns` declaration

## Input

`````js filename=intro
const str = $('abc');
const arr = Array.from(str);
$(arr);
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`abc`);
const arr /*:array*/ = $Array_from(str);
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Array_from($(`abc`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "abc" );
const b = $Array_from( a );
$( b );
`````


## Todos triggered


- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Array_from


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abc'
 - 2: ['a', 'b', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
