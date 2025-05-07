# Preval test case

# arr_arr.md

> Normalize > Pattern > Assignment > Base inner def > Arr arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const a = 10;
([[ x = a ]] = [[]]);
$(a);
`````


## Settled


`````js filename=intro
x = 10;
$(10);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = 10;
$(10);
`````


## PST Settled
With rename=true

`````js filename=intro
x = 10;
$( 10 );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
