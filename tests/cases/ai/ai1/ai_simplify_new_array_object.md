# Preval test case

# ai_simplify_new_array_object.md

> Ai > Ai1 > Ai simplify new array object
>
> Test: new Array() and new Object() should be simplified to [] and {}.

## Input

`````js filename=intro
// Expected: const a = []; $("array", typeof a, a.length); const o = {}; $("object", typeof o);
const a = new Array();
$("array", typeof a, a.length); // Track type and a property

const o = new Object();
$("object", typeof o); // Track type
`````


## Settled


`````js filename=intro
const a /*:array*/ = $array_constructor();
const tmpCalleeParam$1 /*:number*/ = a.length;
$(`array`, `object`, tmpCalleeParam$1);
$(`object`, `object`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`array`, `object`, $array_constructor().length);
$(`object`, `object`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $array_constructor();
const b = a.length;
$( "array", "object", b );
$( "object", "object" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $array_constructor();
let tmpCalleeParam = typeof a;
let tmpCalleeParam$1 = a.length;
$(`array`, tmpCalleeParam, tmpCalleeParam$1);
const o = new $object_constructor();
let tmpCalleeParam$3 = typeof o;
$(`object`, tmpCalleeParam$3);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $array_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'array', 'object', 0
 - 2: 'object', 'object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
