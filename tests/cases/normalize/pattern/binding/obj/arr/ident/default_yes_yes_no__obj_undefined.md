# Preval test case

# default_yes_yes_no__obj_undefined.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default yes yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [y = 'fail'] = $(['pass2']) } = { x: undefined, a: 11, b: 12 };
$('bad');
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`pass2`];
const tmpClusterSSA_tmpOPAD /*:unknown*/ = $(tmpCalleeParam);
[...tmpClusterSSA_tmpOPAD];
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpOPAD = $([`pass2`]);
[...tmpClusterSSA_tmpOPAD];
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "pass2" ];
const b = $( a );
[ ...b ];
$( "bad" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternObjRoot = { x: undefined, a: 11, b: 12 };
const tmpOPBD = tmpBindingPatternObjRoot.x;
let tmpOPAD = undefined;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  let tmpCalleeParam = [`pass2`];
  tmpOPAD = $(tmpCalleeParam);
} else {
  tmpOPAD = tmpOPBD;
}
const tmpArrPatternSplat = [...tmpOPAD];
const tmpAPBD = tmpArrPatternSplat[0];
let y = undefined;
const tmpIfTest$1 = tmpAPBD === undefined;
if (tmpIfTest$1) {
  y = `fail`;
  $(`bad`);
} else {
  y = tmpAPBD;
  $(`bad`);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['pass2']
 - 2: 'bad'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
