# Preval test case

# default_yes_yes__obj_null.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) } = $({ x: { a: 'fail2' } })) {
  return 'bad';
}
$(f({ x: null, b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$5 /*:array*/ = [];
$objPatternRest(null, tmpCalleeParam$5, undefined);
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$objPatternRest(null, [], undefined);
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$objPatternRest( null, a, undefined );
$( "bad" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = { a: `fail2` };
    let tmpCalleeParam = { x: tmpObjLitVal };
    tmpBindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    tmpBindingPatternObjRoot = tmpParamBare;
  }
  let tmpOPBD = tmpBindingPatternObjRoot.x;
  let tmpOPAD = undefined;
  const tmpIfTest$1 = tmpOPBD === undefined;
  if (tmpIfTest$1) {
    let tmpCalleeParam$1 = { a: `fail` };
    tmpOPAD = $(tmpCalleeParam$1);
  } else {
    tmpOPAD = tmpOPBD;
  }
  let tmpCalleeParam$3 = tmpOPAD;
  let tmpCalleeParam$5 = [];
  let y = $objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
  return `bad`;
};
const tmpCallCallee = f;
let tmpCalleeParam$9 = { x: null, b: 11, c: 12 };
let tmpCalleeParam$7 = f(tmpCalleeParam$9, 10);
$(tmpCalleeParam$7);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
