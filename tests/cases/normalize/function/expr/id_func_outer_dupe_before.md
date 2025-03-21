# Preval test case

# id_func_outer_dupe_before.md

> Normalize > Function > Expr > Id func outer dupe before
>
> Function expression ids should be eliminated

## Input

`````js filename=intro
const g = 10;
function out() {
  const f = function g() {
    $(typeof g);
  };
  $(g, f());
}
out();
out();
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
