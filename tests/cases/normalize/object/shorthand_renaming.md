# Preval test case

# shorthand_renaming.md

> Normalize > Object > Shorthand renaming
>
> The unique naming system must properly handle property shorthands

## Input

`````js filename=intro
let f = function({x = 10}) {
  return x;
}
let g = function({x = 10}) {
  let y = {x}; // Make sure x gets renamed
  return [x, y];
}
$(f(), g());
`````


## Settled


`````js filename=intro
undefined.x;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined.x;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
undefined.x;
throw "[Preval]: Can not reach here";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPBD = tmpBindingPatternObjRoot.x;
  let x = undefined;
  const tmpIfTest = tmpOPBD === undefined;
  if (tmpIfTest) {
    x = 10;
    return x;
  } else {
    x = tmpOPBD;
    return x;
  }
};
let g = function ($$0) {
  const tmpParamBare$1 = $$0;
  debugger;
  let tmpBindingPatternObjRoot$1 = tmpParamBare$1;
  let tmpOPBD$1 = tmpBindingPatternObjRoot$1.x;
  let x$1 = undefined;
  const tmpIfTest$1 = tmpOPBD$1 === undefined;
  if (tmpIfTest$1) {
    x$1 = 10;
  } else {
    x$1 = tmpOPBD$1;
  }
  let y = { x: x$1 };
  const tmpReturnArg = [x$1, y];
  return tmpReturnArg;
};
let tmpCalleeParam = f();
let tmpCalleeParam$1 = g();
$(tmpCalleeParam, tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
