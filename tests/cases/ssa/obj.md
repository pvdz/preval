# Preval test case

# obj.md

> Ssa > Obj
>
> Object side effect checking was bugged

## Input

`````js filename=intro
const tmpArrElement$517 = function () {
  let obj = undefined;
  const f = function (c) {
    obj.bla = c;
  };
  obj = {
    selfRef: f,
  };
};
if ($) $(tmpArrElement$517());
`````


## Settled


`````js filename=intro
if ($) {
  const f /*:(unknown)=>undefined*/ = function ($$0) {
    const c /*:unknown*/ = $$0;
    debugger;
    obj.bla = c;
    return undefined;
  };
  const obj /*:object*/ /*truthy*/ = { selfRef: f };
  $(undefined);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const f = function (c) {
    obj.bla = c;
  };
  const obj = { selfRef: f };
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = function($$0 ) {
    const b = $$0;
    debugger;
    c.bla = b;
    return undefined;
  };
  const c = { selfRef: a };
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement$517 = function () {
  debugger;
  let obj = undefined;
  const f = function ($$0) {
    let c = $$0;
    debugger;
    obj.bla = c;
    return undefined;
  };
  obj = { selfRef: f };
  return undefined;
};
if ($) {
  let tmpCalleeParam = tmpArrElement$517();
  $(tmpCalleeParam);
} else {
}
`````


## Todos triggered


- (todo) support ObjectExpression as var init in let_hoisting noob check


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
