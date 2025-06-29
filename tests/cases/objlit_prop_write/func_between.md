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
const f /*:()=>unknown*/ = function () {
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
const f = function () {};
$(undefined);
$({ foo: 1 });
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( undefined );
const b = { foo: 1 };
$( b );
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
