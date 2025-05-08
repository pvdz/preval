# Preval test case

# default_no_no__arr_str.md

> Normalize > Pattern > Binding > Arr > Arr > Rest > Default no no  arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[...x]] = ['abc', 4, 5];
$(x);
`````


## Settled


`````js filename=intro
const x /*:array*/ = [`a`, `b`, `c`];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`a`, `b`, `c`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c" ];
$( a );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_slice
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_slice
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['a', 'b', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
