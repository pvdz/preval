# Preval test case

# default_no_no__123.md

> Normalize > Pattern > Binding > Arr > Arr > Rest > Default no no  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[...x]] = [[ 100, 200 ]];
$(x);
`````


## Settled


`````js filename=intro
const x /*:array*/ = [100, 200];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([100, 200]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 100, 200 ];
$( a );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) inline computed array property read
- (todo) replace with $array_slice
- (todo) type trackeed tricks can possibly support method $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [100, 200]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
