# Preval test case

# func_prototype.md

> Property lookup > Func prototype
>
> Getting the prototype from a known function, whatever it is, should yield `Function.prototype`

## Input

`````js filename=intro
function f(){}
const proto = f.prototype;
$(proto);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const proto /*:unknown*/ = f.prototype;
$(proto);
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
let f = function () {
  debugger;
  return undefined;
};
const proto = f.prototype;
$(proto);
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
