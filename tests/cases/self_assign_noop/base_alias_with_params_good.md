# Preval test case

# base_alias_with_params_good.md

> Self assign noop > Base alias with params good

This is where it goes wrong because the alias will call the outer function
again if ever called _after_ the first call (either directly or through the
alias) since it is a permanent reference to the outer function.

So calling the alias, again, would create a new closure, with a different 
value, and then store that in `f`. For any such call to the alias.
Which is fine if `f` is then never referenced. But I mean.

## Input

`````js filename=intro
var f = function(a, b) {
  f = function(c, d){
    $('inner');
  };
  return f(a, b);
}
function h() {
  const g = f;
  g(3, 4); // immediately invoked, this is ok!
  f(1, 2);
}
$(h);
`````


## Settled


`````js filename=intro
const h /*:()=>unknown*/ = function () {
  debugger;
  $(`inner`);
  $(`inner`);
  return undefined;
};
$(h);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  $(`inner`);
  $(`inner`);
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "inner" );
  $( "inner" );
  return undefined;
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = undefined;
let h = function () {
  debugger;
  const g = f;
  f(3, 4);
  f(1, 2);
  return undefined;
};
f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  f = function ($$0, $$1) {
    let c = $$0;
    let d = $$1;
    debugger;
    $(`inner`);
    return undefined;
  };
  const tmpReturnArg = f(a, b);
  return tmpReturnArg;
};
$(h);
`````


## Todos triggered


- (todo) Found a self-closing function shell but it did not match a known pattern...


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
