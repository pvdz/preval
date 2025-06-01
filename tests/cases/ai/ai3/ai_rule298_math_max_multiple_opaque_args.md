# Preval test case

# ai_rule298_math_max_multiple_opaque_args.md

> Ai > Ai3 > Ai rule298 math max multiple opaque args
>
> Test: Math.max with multiple opaque arguments.

## Input

`````js filename=intro
// Expected: Math.max(a, b, c); (or equivalent, call preserved)
let a = $('a', 1);
let b = $('b', 10);
let c = $('c', 5);
let result = $('result', Math.max(a, b, c));
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`a`, 1);
const b /*:unknown*/ = $(`b`, 10);
const c /*:unknown*/ = $(`c`, 5);
const tmpCalleeParam /*:number*/ = $Math_max(a, b, c);
$(`result`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(`a`, 1);
const b = $(`b`, 10);
$(`result`, $Math_max(a, b, $(`c`, 5)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a", 1 );
const b = $( "b", 10 );
const c = $( "c", 5 );
const d = $Math_max( a, b, c );
$( "result", d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = $(`a`, 1);
let b = $(`b`, 10);
let c = $(`c`, 5);
const tmpMCF = $Math_max;
let tmpCalleeParam = $Math_max(a, b, c);
let result = $(`result`, tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_max


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a', 1
 - 2: 'b', 10
 - 3: 'c', 5
 - 4: 'result', NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
