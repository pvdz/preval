# Preval test case

# arr.md

> Normalize > Pattern > Binding > Base no def > Arr
>
> Testing simple pattern normalizations

See https://pvdz.ee/weblog/438 on discussions on transforming this

## Input

`````js filename=intro
const [ x ] = [ 100 ];
$(x);
`````


## Settled


`````js filename=intro
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternArrRoot = [100];
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const x = tmpArrPatternSplat[0];
$(x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
