# Preval test case

# complex_simple.md

> Normalize > Tagged > Complex simple
>
> A tagged template that has complex elements should be normalized to only contain simple ones

## Input

`````js filename=intro
$`abc ${ $(10) } ${ 20 } def`;
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(10);
const tmpCalleeParam /*:array*/ /*truthy*/ = [`abc `, ` `, ` def`];
$(tmpCalleeParam, tmpCalleeParam$1, 20);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(10);
$([`abc `, ` `, ` def`], tmpCalleeParam$1, 20);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
const b = [ "abc ", " ", " def" ];
$( b, a, 20 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [`abc `, ` `, ` def`];
let tmpCalleeParam$1 = $(10);
$(tmpCalleeParam, tmpCalleeParam$1, 20);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: ['abc ', ' ', ' def'], 10, 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
