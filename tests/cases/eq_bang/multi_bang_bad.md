# Preval test case

# multi_bang_bad.md

> Eq bang > Multi bang bad
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
$(same);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const b /*:unknown*/ = $(2);
const same /*:boolean*/ = a === b;
const tmpCalleeParam /*:boolean*/ = !same;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = !same;
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:boolean*/ = !same;
$(tmpCalleeParam$3);
$(same);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const same = $(1) === $(2);
$(!same);
$(!same);
$(!same);
$(same);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a === b;
const d = !c;
$( d );
const e = !c;
$( e );
const f = !c;
$( f );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(1);
const b = $(2);
const same = a === b;
let tmpCalleeParam = !same;
$(tmpCalleeParam);
let tmpCalleeParam$1 = !same;
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = !same;
$(tmpCalleeParam$3);
$(same);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true
 - 4: true
 - 5: true
 - 6: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
