# Preval test case

# default_no__arr_empty.md

> Normalize > Pattern > Assignment > Arr > Rest > Default no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([...x] = []);
$(x);
`````


## Settled


`````js filename=intro
x = [];
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = [];
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
x = [];
$( x );
`````


## Todos triggered


- (todo) replace with $array_slice
- (todo) type trackeed tricks can possibly support method $array_slice


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
