# Preval test case

# ai_rule292_object_is_opaque_values.md

> Ai > Ai3 > Ai rule292 object is opaque values
>
> Test: Object.is with two opaque values.

## Input

`````js filename=intro
// Expected: Object.is(a, b); (or equivalent, call preserved)
let a = $('a', 1);
let b = $('b', 2);
let result = $('result', Object.is(a, b));
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`a`, 1);
const b /*:unknown*/ = $(`b`, 2);
const tmpCalleeParam /*:boolean*/ = $Object_is(a, b);
$(`result`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(`a`, 1);
$(`result`, $Object_is(a, $(`b`, 2)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a", 1 );
const b = $( "b", 2 );
const c = $Object_is( a, b );
$( "result", c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = $(`a`, 1);
let b = $(`b`, 2);
const tmpMCF = $Object_is;
let tmpCalleeParam = $Object_is(a, b);
let result = $(`result`, tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Object_is


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a', 1
 - 2: 'b', 2
 - 3: 'result', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
