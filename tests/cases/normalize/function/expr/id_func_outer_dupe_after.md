# Preval test case

# id_func_outer_dupe_after.md

> Normalize > Function > Expr > Id func outer dupe after
>
> Function expression ids should be eliminated

## Input

`````js filename=intro
function out() {
  const f = function g() {
    $(typeof g);
  };
  $(g, f());
}
const g = 10;
out();
out();
$(typeof g);
`````


## Settled


`````js filename=intro
const out /*:()=>unknown*/ = function () {
  debugger;
  $(`function`);
  $(10, undefined);
  return undefined;
};
out();
out();
$(`number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const out = function () {
  $(`function`);
  $(10, undefined);
};
out();
out();
$(`number`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "function" );
  $( 10, undefined );
  return undefined;
};
a();
a();
$( "number" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let out = function () {
  debugger;
  const g$1 = function () {
    debugger;
    let tmpCalleeParam = typeof g$1;
    $(tmpCalleeParam);
    return undefined;
  };
  const f = g$1;
  let tmpCalleeParam$1 = g;
  let tmpCalleeParam$3 = f();
  $(tmpCalleeParam$1, tmpCalleeParam$3);
  return undefined;
};
const g = 10;
out();
out();
let tmpCalleeParam$5 = typeof g;
$(tmpCalleeParam$5);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'function'
 - 2: 10, undefined
 - 3: 'function'
 - 4: 10, undefined
 - 5: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
