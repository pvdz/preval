# Preval test case

# if_x_else_ret_bool_x.md

> Ret bool after if > If x else ret bool x
>
> This one works

## Input

`````js filename=intro
function f() {
  const x = Boolean(y);
  if (y) {
    return y;
  } else {
    return x;
  }
}
$(f());
$(f());
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  if (y) {
    return y;
  } else {
    y;
    return false;
  }
};
const tmpCalleeParam /*:unknown*/ = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:unknown*/ = f();
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  if (y) {
    return y;
  } else {
    y;
    return false;
  }
};
$(f());
$(f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  if (y) {
    return y;
  }
  else {
    y;
    return false;
  }
};
const b = a();
$( b );
const c = a();
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const x = $boolean_constructor(y);
  if (y) {
    return y;
  } else {
    return x;
  }
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
