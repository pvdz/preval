# Preval test case

# multi_bang.md

> Eq bang > Multi bang
>
> A comparison followed by a bang on the result which is then tested is redundant if the value is not used anywhere else.

Found in Tenko, inside _parseClassBody

## Input

`````js filename=intro
const a = $(1);
const b = $(2);
const same = a === b;
$(!same);
$(!same);
$(!same);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const b /*:unknown*/ = $(2);
const same /*:boolean*/ = a !== b;
$(same);
$(same);
$(same);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const same = $(1) !== $(2);
$(same);
$(same);
$(same);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a !== b;
$( c );
$( c );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true
 - 4: true
 - 5: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
