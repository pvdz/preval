# Preval test case

# default_yes_yes_no__arr_obj_null.md

> Normalize > Pattern > Binding > Arr > Obj > Ident > Default yes yes no  arr obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ x = $('fail') } = $({ x: 'fail2' })] = [{ x: null, y: 2, z: 3 }, 20, 30];
$(x);
`````


## Settled


`````js filename=intro
$(null);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(null);
`````


## PST Settled
With rename=true

`````js filename=intro
$( null );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = { x: null, y: 2, z: 3 };
const tmpBindingPatternArrRoot = [tmpArrElement, 20, 30];
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const tmpAPBD = tmpArrPatternSplat[0];
let tmpArrPatternStep = undefined;
const tmpIfTest = tmpAPBD === undefined;
if (tmpIfTest) {
  let tmpCalleeParam = { x: `fail2` };
  tmpArrPatternStep = $(tmpCalleeParam);
} else {
  tmpArrPatternStep = tmpAPBD;
}
const tmpOPBD = tmpArrPatternStep.x;
let x = undefined;
const tmpIfTest$1 = tmpOPBD === undefined;
if (tmpIfTest$1) {
  x = $(`fail`);
  $(x);
} else {
  x = tmpOPBD;
  $(tmpOPBD);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
