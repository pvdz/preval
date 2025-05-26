# Preval test case

# default_yes_yes_no__obj_undefined.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['pass2']) }) {
  return 'bad';
}
$(f({ x: undefined, a: 11, b: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`pass2`];
const tmpSSA_tmpOPAD /*:unknown*/ = $(tmpCalleeParam);
[...tmpSSA_tmpOPAD];
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSSA_tmpOPAD = $([`pass2`]);
[...tmpSSA_tmpOPAD];
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
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPBD = tmpBindingPatternObjRoot.x;
  let tmpOPAD = undefined;
  const tmpIfTest = tmpOPBD === undefined;
  if (tmpIfTest) {
    let tmpCalleeParam = [`pass2`];
    tmpOPAD = $(tmpCalleeParam);
  } else {
    tmpOPAD = tmpOPBD;
  }
  let tmpArrPatternSplat = [...tmpOPAD];
  let tmpAPBD = tmpArrPatternSplat[0];
  let y = undefined;
  const tmpIfTest$1 = tmpAPBD === undefined;
  if (tmpIfTest$1) {
    y = `fail`;
    return `bad`;
  } else {
    y = tmpAPBD;
    return `bad`;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam$3 = { x: undefined, a: 11, b: 12 };
let tmpCalleeParam$1 = f(tmpCalleeParam$3, 10);
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
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
