# Preval test case

# const-plus.md

> Binary > Const-plus
>
> Const inlining with addition inlining will require a loop of sorts

## Input

`````js filename=intro
const x = 'a';
const y = 'b' + x;
const z = x + y;
const xyz = z;
$(xyz);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = `a`;
const tmpStringConcatL = $coerce(x, `plustr`);
const y = `b${tmpStringConcatL}`;
const z = x + y;
const xyz = z;
$(z);
`````


## Todos triggered


None


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
