# Preval test case

# unkown_passing.md

> Let hoisting > Unkown passing
>
> ?

This was passing. Failing if x renames to A.

Caused by a regression in let hoisting.

## Input

`````js filename=intro
let x = false;
function f() {
    let y = 0;
    x = true;
    return y;
}
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return 0;
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function $pcompiled() {
  return 0;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  return 0;
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let y = 0;
  x = true;
  return y;
};
let x = false;
$(f);
`````


## Todos triggered


None


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
