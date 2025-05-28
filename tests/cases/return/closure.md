# Preval test case

# closure.md

> Return > Closure
>
> If a function returns a closure that is accessible from the caller, the closure should be outlined...

## Input

`````js filename=intro
function f() {
  let x = 0;
  function g() {
    ++x;
    return x;
  }

  $(g());
  $(g());
  $(g());
}
$(f())
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const g /*:()=>undefined*/ = function () {
    debugger;
    const tmpPostUpdArgIdent /*:unknown*/ = x;
    x = tmpPostUpdArgIdent + 1;
    return undefined;
  };
  let x /*:primitive*/ = 0;
  g();
  $(x);
  g();
  $(x);
  g();
  $(x);
  return undefined;
};
f();
$(undefined);
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const g = function () {
    x = x + 1;
  };
  let x = 0;
  g();
  $(x);
  g();
  $(x);
  g();
  $(x);
};
f();
$(undefined);
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = function() {
    debugger;
    const c = d;
    d = c + 1;
    return undefined;
  };
  let d = 0;
  b();
  $( d );
  b();
  $( d );
  b();
  $( d );
  return undefined;
};
a();
$( undefined );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    const tmpPostUpdArgIdent = $coerce(x, `number`);
    x = tmpPostUpdArgIdent + 1;
    return x;
  };
  let x = 0;
  let tmpCalleeParam = g();
  $(tmpCalleeParam);
  let tmpCalleeParam$1 = g();
  $(tmpCalleeParam$1);
  let tmpCalleeParam$3 = g();
  $(tmpCalleeParam$3);
  return undefined;
};
let tmpCalleeParam$5 = f();
$(tmpCalleeParam$5);
$(f);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: undefined
 - 5: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
