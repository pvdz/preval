# Preval test case

# default_yes_no__obj_0.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Default yes no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { ...y } = $({ a: 'fail' }) } = { x: 0, b: 11, c: 12 };
$(y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [];
const y /*:unknown*/ = $objPatternRest(0, tmpCalleeParam$3, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($objPatternRest(0, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $objPatternRest( 0, a, undefined );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternObjRoot = { x: 0, b: 11, c: 12 };
const tmpOPBD = tmpBindingPatternObjRoot.x;
let tmpOPAD = undefined;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  let tmpCalleeParam = { a: `fail` };
  tmpOPAD = $(tmpCalleeParam);
} else {
  tmpOPAD = tmpOPBD;
}
let tmpCalleeParam$1 = tmpOPAD;
let tmpCalleeParam$3 = [];
const y = $objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(y);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
