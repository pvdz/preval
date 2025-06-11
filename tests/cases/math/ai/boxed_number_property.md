# Preval test case

# boxed_number_property.md

> Math > Ai > Boxed number property
>
> Boxed number as object property key

## Input

`````js filename=intro
const a = $(new Number(42));
const obj = {};
obj[a] = "value";
$(obj["42"]);
// Should be "value"
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = new $number_constructor(42);
const a /*:unknown*/ = $(tmpCalleeParam);
const obj /*:object*/ /*truthy*/ = {};
obj[a] = `value`;
const tmpCalleeParam$1 /*:unknown*/ = obj[`42`];
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(new $number_constructor(42));
const obj = {};
obj[a] = `value`;
$(obj[`42`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $number_constructor( 42 );
const b = $( a );
const c = {};
c[b] = "value";
const d = c[ "42" ];
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = new $number_constructor(42);
const a = $(tmpCalleeParam);
const obj = {};
obj[a] = `value`;
let tmpCalleeParam$1 = obj[`42`];
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: 'value'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
