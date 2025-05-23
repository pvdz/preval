# Preval test case

# branched_assign_returned_prim.md

> Return > Branched assign returned prim
>
> What if a binding was assigned a value in two branches and then returned after the `if`?

## Input

`````js filename=intro
function f() {
  let x = undefined;
  if ($(1)) {
    x = 10;
  } else {
    x = 20;
  }
  return x;
}
f();
f();
f();
f();
$(f());
`````


## Settled


`````js filename=intro
const f /*:()=>number*/ = function () {
  debugger;
  const tmpIfTest /*:unknown*/ = $(1);
  if (tmpIfTest) {
    return 10;
  } else {
    return 20;
  }
};
f();
f();
f();
f();
const tmpCalleeParam /*:number*/ = f();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  if ($(1)) {
    return 10;
  } else {
    return 20;
  }
};
f();
f();
f();
f();
$(f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  if (b) {
    return 10;
  }
  else {
    return 20;
  }
};
a();
a();
a();
a();
const c = a();
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    x = 10;
    return x;
  } else {
    x = 20;
    return x;
  }
};
f();
f();
f();
f();
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
