# Preval test case

# base.md

> Function > Prototype > Base
>
> The function has its own prototype object, not to be confused
> with func.__proto__ which would point to Function.prototype

## Input

`````js filename=intro
$(function(){}.prototype);
`````


## Settled


`````js filename=intro
const tmpCompObj /*:()=>undefined*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const tmpCalleeParam /*:unknown*/ = tmpCompObj.prototype;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function $pcompiled() {}.prototype);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $pcompiled() {
  debugger;
  return undefined;
};
const b = a.prototype;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = function () {
  debugger;
  return undefined;
};
let tmpCalleeParam = tmpCompObj.prototype;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
