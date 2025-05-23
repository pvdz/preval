# Preval test case

# objlit_prop_vardecl_func.md

> Object literal > Objlit prop vardecl func
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
    const tmpObjLitVal /*:unknown*/ = $(1);
const o /*:object*/ = { x: tmpObjLitVal };
const f /*:()=>undefined*/ = function() {
  debugger;
  const tmpCalleeParam /*:unknown*/ = o.x;
  $(tmpCalleeParam);
  return undefined;
};
const tmpCalleeParam$1 /*:unknown*/ = o.x; // <- can inline if we know f is not spying
$(tmpCalleeParam$1);
o.x = 10;
f();
f();
f();
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const o /*:object*/ = { x: tmpObjLitVal };
const f /*:()=>undefined*/ = function () {
  debugger;
  const tmpCalleeParam /*:unknown*/ = o.x;
  $(tmpCalleeParam);
  return undefined;
};
$(tmpObjLitVal);
o.x = 10;
f();
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
const f = function () {
  $(o.x);
};
$(tmpObjLitVal);
o.x = 10;
f();
f();
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { x: a };
const c = function() {
  debugger;
  const d = b.x;
  $( d );
  return undefined;
};
$( a );
b.x = 10;
c();
c();
c();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
const f = function () {
  debugger;
  const tmpCalleeParam = o.x;
  $(tmpCalleeParam);
  return undefined;
};
const tmpCalleeParam$1 = o.x;
$(tmpCalleeParam$1);
o.x = 10;
f();
f();
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 10
 - 4: 10
 - 5: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
