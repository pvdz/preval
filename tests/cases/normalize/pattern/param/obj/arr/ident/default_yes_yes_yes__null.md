# Preval test case

# default_yes_yes_yes__null.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes yes  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['fail2']) } = $({ x: ['fail3'] })) {
  return 'bad';
}
$(f(null, 10));
`````


## Settled


`````js filename=intro
null.x;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
null.x;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
null.x;
throw "[Preval]: Can not reach here";
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
    const tmpObjLitVal = [`fail3`];
    let tmpCalleeParam = { x: tmpObjLitVal };
    tmpBindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    tmpBindingPatternObjRoot = tmpParamBare;
  }
  let tmpOPBD = tmpBindingPatternObjRoot.x;
  let tmpOPAD = undefined;
  const tmpIfTest$1 = tmpOPBD === undefined;
  if (tmpIfTest$1) {
    let tmpCalleeParam$1 = [`fail2`];
    tmpOPAD = $(tmpCalleeParam$1);
  } else {
    tmpOPAD = tmpOPBD;
  }
  let tmpArrPatternSplat = [...tmpOPAD];
  let tmpAPBD = tmpArrPatternSplat[0];
  let y = undefined;
  const tmpIfTest$3 = tmpAPBD === undefined;
  if (tmpIfTest$3) {
    y = `fail`;
    return `bad`;
  } else {
    y = tmpAPBD;
    return `bad`;
  }
};
let tmpCalleeParam$3 = f(null, 10);
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) property on nullable; unreachable or hard error?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
