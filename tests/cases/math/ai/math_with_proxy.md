# Preval test case

# math_with_proxy.md

> Math > Ai > Math with proxy
>
> Math.abs with proxy object

## Input

`````js filename=intro
const p = new Proxy({ valueOf: () => -42 }, {});
const a = $(Math.abs(p));
$(a);
// Should be 42
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = Proxy;
const tmpObjLitVal /*:()=>number*/ = function $pcompiled() {
  debugger;
  return -42;
};
const tmpCalleeParam /*:object*/ /*truthy*/ = { valueOf: tmpObjLitVal };
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = {};
const p /*:object*/ /*truthy*/ = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:number*/ = $Math_abs(p);
const a /*:unknown*/ = $(tmpCalleeParam$3);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = Proxy;
const tmpObjLitVal = function $pcompiled() {
  return -42;
};
const tmpCalleeParam = { valueOf: tmpObjLitVal };
const tmpCalleeParam$1 = {};
$($($Math_abs(new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1))));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = Proxy;
const b = function $pcompiled() {
  debugger;
  return -42;
};
const c = { valueOf: b };
const d = {};
const e = new a( c, d );
const f = $Math_abs( e );
const g = $( f );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpNewCallee = Proxy;
const tmpObjLitVal = function () {
  debugger;
  return -42;
};
let tmpCalleeParam = { valueOf: tmpObjLitVal };
let tmpCalleeParam$1 = {};
const p = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpMCF = $Math_abs;
let tmpCalleeParam$3 = $Math_abs(p);
const a = $(tmpCalleeParam$3);
$(a);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_abs


## Globals


BAD@! Found 1 implicit global bindings:

Proxy


## Runtime Outcome


Should call `$` with:
 - 1: 42
 - 2: 42
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
