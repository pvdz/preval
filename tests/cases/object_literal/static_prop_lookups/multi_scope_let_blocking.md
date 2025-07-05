# Preval test case

# multi_scope_let_blocking.md

> Object literal > Static prop lookups > Multi scope let blocking
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
let o = {x: $(1)};
const f = function() {
  $(o.x);
};
$(o.x);
o = {x: 10};
f();
f();
f();
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
let o /*:object*/ /*truthy*/ = { x: tmpObjLitVal };
const f /*:()=>undefined*/ = function () {
  debugger;
  const tmpCalleeParam /*:unknown*/ = o.x;
  $(tmpCalleeParam);
  return undefined;
};
$(tmpObjLitVal);
o = { x: 10 };
f();
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
let o = { x: tmpObjLitVal };
const f = function () {
  $(o.x);
};
$(tmpObjLitVal);
o = { x: 10 };
f();
f();
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = { x: a };
const c = function() {
  debugger;
  const d = b.x;
  $( d );
  return undefined;
};
$( a );
b = { x: 10 };
c();
c();
c();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(1);
let o = { x: tmpObjLitVal };
const f = function () {
  debugger;
  let tmpCalleeParam = o.x;
  $(tmpCalleeParam);
  return undefined;
};
let tmpCalleeParam$1 = o.x;
$(tmpCalleeParam$1);
o = { x: 10 };
f();
f();
f();
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check
- (todo) support Identifier as var init in let_hoisting noob check


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
