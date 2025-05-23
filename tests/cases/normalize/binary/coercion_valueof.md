# Preval test case

# coercion_valueof.md

> Normalize > Binary > Coercion valueof
>
> Comparison ops trigger coercion mechanisms.

## Input

`````js filename=intro
const a = $({valueOf: $});
const b = 2;
a < b; // This shouldn't be eliminated because it triggers the valueOf above
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { valueOf: $ };
const a /*:unknown*/ = $(tmpCalleeParam);
a ** 0;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ valueOf: $ }) ** 0;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { valueOf: $ };
const b = $( a );
b ** 0;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { valueOf: $ };
const a = $(tmpCalleeParam);
const b = 2;
a < b;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { valueOf: '"<$>"' }
 - 2: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
