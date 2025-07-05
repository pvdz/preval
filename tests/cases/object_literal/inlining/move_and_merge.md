# Preval test case

# move_and_merge.md

> Object literal > Inlining > Move and merge
>
> Move and merge when we can

## Input

`````js filename=intro
function f() {
  const obj = {};
  const f = function(a){
    $('inner func', a);
    return a;
  };
  obj.f = f;
  return obj;
}
const x = f(123);
const tmp = x.f();
$(tmp);
`````


## Settled


`````js filename=intro
$(`inner func`, undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`inner func`, undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "inner func", undefined );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const f$1 = function ($$0) {
    let a = $$0;
    debugger;
    $(`inner func`, a);
    return a;
  };
  const obj = { f: f$1 };
  return obj;
};
const x = f(123);
const tmpMCF = x.f;
const tmp = $dotCall(tmpMCF, x, `f`);
$(tmp);
`````


## Todos triggered


- (todo) support ObjectExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'inner func', undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
