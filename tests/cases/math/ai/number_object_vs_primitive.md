# Preval test case

# number_object_vs_primitive.md

> Math > Ai > Number object vs primitive
>
> Number object vs primitive comparison

## Input

`````js filename=intro
const a = $(new Number(0.1 + 0.2));
const b = $(0.3);
$(a == b);
$(a === b);
// == should be true, === should be false
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = new $number_constructor(0.30000000000000004);
const a /*:unknown*/ = $(tmpCalleeParam);
const b /*:unknown*/ = $(0.3);
const tmpCalleeParam$3 /*:boolean*/ = a == b;
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:boolean*/ = a === b;
$(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(new $number_constructor(0.30000000000000004));
const b = $(0.3);
$(a == b);
$(a === b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $number_constructor( 0.30000000000000004 );
const b = $( a );
const c = $( 0.3 );
const d = b == c;
$( d );
const e = b === c;
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpNewCallee = Number;
let tmpCalleeParam$1 = 0.30000000000000004;
let tmpCalleeParam = new tmpNewCallee(tmpCalleeParam$1);
const a = $(tmpCalleeParam);
const b = $(0.3);
let tmpCalleeParam$3 = a == b;
$(tmpCalleeParam$3);
let tmpCalleeParam$5 = a === b;
$(tmpCalleeParam$5);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: 0.3
 - 3: false
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
