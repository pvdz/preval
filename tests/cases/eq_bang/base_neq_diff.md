# Preval test case

# base_neq_diff.md

> Eq bang > Base neq diff
>
> A comparison followed by a bang on the result which is then tested is redundant if the value is not used anywhere else.

Found in Tenko, inside _parseClassBody

## Input

`````js filename=intro
const a = $(1);
const b = $(2);
const same = a !== b;
let diff = !same;
$(diff);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const b /*:unknown*/ = $(2);
const diff /*:boolean*/ = a === b;
$(diff);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
$(a === $(2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a === b;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(1);
const b = $(2);
const same = a !== b;
let diff = !same;
$(diff);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
