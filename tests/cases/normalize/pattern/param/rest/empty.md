# Preval test case

# empty.md

> Normalize > Pattern > Param > Rest > Empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f(...x) {
  return x;
}
$(f());
`````


## Settled


`````js filename=intro
const x /*:array*/ = [];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a );
`````


## Todos triggered


- (todo) drop unused rest param?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
