# Preval test case

# string_arr_twice.md

> Normalize > Spread > String arr twice
>
> Literal operations can be extrapolated and reduced

## Input

`````js filename=intro
const x = [..."hello", ..."world"];
$(x);
`````


## Settled


`````js filename=intro
const x /*:array*/ = [`h`, `e`, `l`, `l`, `o`, `w`, `o`, `r`, `l`, `d`];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`h`, `e`, `l`, `l`, `o`, `w`, `o`, `r`, `l`, `d`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "h", "e", "l", "l", "o", "w", "o", "r", "l", "d" ];
$( a );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
