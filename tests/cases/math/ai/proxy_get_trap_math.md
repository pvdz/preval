# Preval test case

# proxy_get_trap_math.md

> Math > Ai > Proxy get trap math
>
> Proxy get trap affecting numeric result

## Input

`````js filename=intro
const p = new Proxy({x: 0.1 + 0.2}, { get: (t, k) => t[k] + 0.1 });
const v = p.x;
$(v);
// Should be 0.4000000000000001
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = Proxy;
const tmpObjLitVal$1 /*:(unknown, unknown)=>primitive*/ = function ($$0, $$1) {
  const t /*:unknown*/ = $$0;
  const k /*:unknown*/ = $$1;
  debugger;
  const tmpBinLhs /*:unknown*/ = t[k];
  const tmpReturnArg /*:primitive*/ = tmpBinLhs + 0.1;
  return tmpReturnArg;
};
const tmpCalleeParam /*:object*/ /*truthy*/ = { x: 0.30000000000000004 };
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { get: tmpObjLitVal$1 };
const p /*:object*/ /*truthy*/ = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
const v /*:unknown*/ = p.x;
$(v);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = Proxy;
const tmpObjLitVal$1 = function (t, k) {
  const tmpReturnArg = t[k] + 0.1;
  return tmpReturnArg;
};
const tmpCalleeParam = { x: 0.30000000000000004 };
const tmpCalleeParam$1 = { get: tmpObjLitVal$1 };
$(new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1).x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = Proxy;
const b = function($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  const e = c[ d ];
  const f = e + 0.1;
  return f;
};
const g = { x: 0.30000000000000004 };
const h = { get: b };
const i = new a( g, h );
const j = i.x;
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpNewCallee = Proxy;
const tmpObjLitVal = 0.30000000000000004;
let tmpCalleeParam = { x: tmpObjLitVal };
const tmpObjLitVal$1 = function ($$0, $$1) {
  let t = $$0;
  let k = $$1;
  debugger;
  const tmpBinLhs = t[k];
  const tmpReturnArg = tmpBinLhs + 0.1;
  return tmpReturnArg;
};
let tmpCalleeParam$1 = { get: tmpObjLitVal$1 };
const p = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
const v = p.x;
$(v);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

Proxy


## Runtime Outcome


Should call `$` with:
 - 1: 0.4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
