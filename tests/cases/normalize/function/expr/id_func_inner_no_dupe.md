# Preval test case

# id_func_inner_no_dupe.md

> Normalize > Function > Expr > Id func inner no dupe
>
> Function expression ids should be eliminated

## Input

`````js filename=intro
function out() {
  const f = function g() {
    $(typeof g);
  };
  $(typeof g, f());
}
out();
out();
`````

## Settled


`````js filename=intro
const out /*:()=>unknown*/ = function () {
  debugger;
  $(`function`);
  const tmpCalleeParam$1 /*:string*/ = typeof g;
  $(tmpCalleeParam$1, undefined);
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
  $(typeof g, undefined);
};
out();
out();
`````

## Pre Normal


`````js filename=intro
let out = function () {
  debugger;
  const f = function g$1() {
    debugger;
    $(typeof g$1);
  };
  $(typeof g, f());
};
out();
out();
`````

## Normalized


`````js filename=intro
let out = function () {
  debugger;
  const g$1 = function () {
    debugger;
    const tmpCalleeParam = typeof g$1;
    $(tmpCalleeParam);
    return undefined;
  };
  const f = g$1;
  const tmpCalleeParam$1 = typeof g;
  const tmpCalleeParam$3 = f();
  $(tmpCalleeParam$1, tmpCalleeParam$3);
  return undefined;
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
  const b = typeof g;
  $( b, undefined );
  return undefined;
};
a();
a();
`````

## Globals

BAD@! Found 1 implicit global bindings:

g

## Runtime Outcome

Should call `$` with:
 - 1: 'function'
 - 2: 'undefined', undefined
 - 3: 'function'
 - 4: 'undefined', undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
