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
const arr /*:array*/ /*truthy*/ = $Array_from(str);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`abc`);
const tmpMCF = $Array_from;
const arr = $Array_from(str);
$(arr);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Array_from


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
