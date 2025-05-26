# Preval test case

# default_yes_no__obj_undefined.md

> Normalize > Pattern > Assignment > Obj > Arr > Default yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [] = $(['fail']) } = { x: undefined, a: 11, b: 12 });
$('ok');
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`fail`];
const tmpSSA_tmpOPAD /*:unknown*/ = $(tmpCalleeParam);
[...tmpSSA_tmpOPAD];
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSSA_tmpOPAD = $([`fail`]);
[...tmpSSA_tmpOPAD];
$(`ok`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "fail" ];
const b = $( a );
[ ...b ];
$( "ok" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = { x: undefined, a: 11, b: 12 };
const tmpOPBD = tmpAssignObjPatternRhs.x;
let tmpOPAD = undefined;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  let tmpCalleeParam = [`fail`];
  tmpOPAD = $(tmpCalleeParam);
} else {
  tmpOPAD = tmpOPBD;
}
const tmpArrPatternSplat = [...tmpOPAD];
$(`ok`);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['fail']
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
