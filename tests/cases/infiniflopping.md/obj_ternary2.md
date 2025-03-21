# Preval test case

# obj_ternary2.md

> Infiniflopping.md > Obj ternary2
>
> Infinitely let hoisting with two competing lets

The let hoisting was flipflopping, fighting which of the two lets to put on top.

Clear sign of not having a stable normalization target ;)

## Input

`````js filename=intro
let f = function () {
  let objPatternCrashTest = undefined;
  let bindingPatternObjRoot = undefined;
  const tmpBranchingC = function () {
    bindingPatternObjRoot = 2;
    const tmpBranchingB$1 = function () {
      if (objPatternCrashTest) {
        objPatternCrashTest = bindingPatternObjRoot;
      }
    };
    if (objPatternCrashTest) {
      tmpBranchingB$1();
    }
  };
  if ($) {
    tmpBranchingC();
  }
};
f();
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
