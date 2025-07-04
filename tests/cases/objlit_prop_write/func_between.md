# Preval test case

# func_between.md

> Objlit prop write > Func between
>
>

## Input

`````js filename=intro
const obj = {};
const f = function(){};
obj.foo = 1;
$(f());
$(obj);
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function $pcompiled() {
  debugger;
  return undefined;
};
$(undefined);
const obj /*:object*/ /*truthy*/ = { foo: 1 };
$(obj);
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function $pcompiled() {};
$(undefined);
$({ foo: 1 });
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  return undefined;
};
$( undefined );
const c = { foo: 1 };
$( c );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  return undefined;
};
const obj = { foo: 1 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(obj);
$(f);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: { foo: '1' }
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
