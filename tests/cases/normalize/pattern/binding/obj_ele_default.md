# Preval test case

# obj_ele_default.md

> Normalize > Pattern > Binding > Obj ele default
>
> From tenko

This would crash.

## Input

`````js filename=intro
function f(a = {}) {
  let {
    x = false,
  } = a;
}
$(f());
`````


## Settled


`````js filename=intro
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = {};
  } else {
    a = tmpParamBare;
  }
  let tmpBindingPatternObjRoot = a;
  let tmpOPBD = tmpBindingPatternObjRoot.x;
  let x = undefined;
  const tmpIfTest$1 = tmpOPBD === undefined;
  if (tmpIfTest$1) {
    x = false;
    return undefined;
  } else {
    x = tmpOPBD;
    return undefined;
  }
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
