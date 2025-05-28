# Preval test case

# try.md

> Let aliases > Try
>
> When two const bindings are assigned the same value, they are an alias

## Input

`````js filename=intro
let x = $(1);
function f() {
  x = 2;
  f = function(){ return x };
  return f();
}
// a and b are clearly an alias
const a = x;
try {
    const b = x;
    $(a, b);
    $(f);
} catch {
  $();
}
`````


## Settled


`````js filename=intro
let f /*:()=>unknown*/ = function () {
  debugger;
  x = 2;
  f = function () {
    debugger;
    return x;
  };
  const tmpReturnArg /*:unknown*/ = f();
  return tmpReturnArg;
};
let x /*:unknown*/ = $(1);
const a /*:unknown*/ = x;
try {
  $(a, x);
  $(f);
} catch (e) {
  $();
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let f = function () {
  x = 2;
  f = function () {
    return x;
  };
  const tmpReturnArg = f();
  return tmpReturnArg;
};
let x = $(1);
const a = x;
try {
  $(a, x);
  $(f);
} catch (e) {
  $();
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = function() {
  debugger;
  b = 2;
  a = function() {
    debugger;
    return b;
  };
  const c = a();
  return c;
};
let b = $( 1 );
const d = b;
try {
  $( d, b );
  $( a );
}
catch (e) {
  $();
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  x = 2;
  f = function () {
    debugger;
    return x;
  };
  const tmpReturnArg = f();
  return tmpReturnArg;
};
let x = $(1);
const a = x;
try {
  const b = x;
  $(a, x);
  $(f);
} catch (e) {
  $();
}
`````


## Todos triggered


- (todo) Found a self-closing function shell but it did not match a known pattern...
- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1, 1
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
