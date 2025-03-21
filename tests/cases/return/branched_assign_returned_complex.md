# Preval test case

# branched_assign_returned_complex.md

> Return > Branched assign returned complex
>
> What if a binding was assigned a value in two branches and then returned after the `if`?

## Input

`````js filename=intro
function f() {
  let x = undefined;
  if ($(1)) {
    x = $(10);
  } else {
    x = $(20);
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
const f /*:()=>unknown*/ = function () {
  debugger;
  const tmpIfTest /*:unknown*/ = $(1);
  if (tmpIfTest) {
    const tmpClusterSSA_x /*:unknown*/ = $(10);
    return tmpClusterSSA_x;
  } else {
    const tmpClusterSSA_x$1 /*:unknown*/ = $(20);
    return tmpClusterSSA_x$1;
  }
};
f();
f();
f();
f();
const tmpCalleeParam /*:unknown*/ = f();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  if ($(1)) {
    const tmpClusterSSA_x = $(10);
    return tmpClusterSSA_x;
  } else {
    const tmpClusterSSA_x$1 = $(20);
    return tmpClusterSSA_x$1;
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
    const c = $( 10 );
    return c;
  }
  else {
    const d = $( 20 );
    return d;
  }
};
a();
a();
a();
a();
const e = a();
$( e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 10
 - 3: 1
 - 4: 10
 - 5: 1
 - 6: 10
 - 7: 1
 - 8: 10
 - 9: 1
 - 10: 10
 - 11: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
