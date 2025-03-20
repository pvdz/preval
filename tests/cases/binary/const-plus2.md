# Preval test case

# const-plus2.md

> Binary > Const-plus2
>
> Const inlining with addition inlining will require a loop of sorts

## Input

`````js filename=intro
`b${`a`}`;
const z = `a${`b${`a`}`}`;
z;
$(z);
`````


## Settled


`````js filename=intro
$(`aba`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`aba`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "aba" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'aba'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
