# Preval test case

# default_yes_no_no__obj_arr_empty_str.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default yes no no  obj arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [y = 'fail'] } = { x: [''], a: 11, b: 12 });
$(y);
`````


## Settled


`````js filename=intro
y = ``;
$(``);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
y = ``;
$(``);
`````


## PST Settled
With rename=true

`````js filename=intro
y = "";
$( "" );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
