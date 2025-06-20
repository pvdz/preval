# Preval test case

# base.md

> Closures > Func tail > Base
>
> The idea is that closures that appear in the tail of a function could also be updated as a return value, reducing the number of closures.

## Input

`````js filename=intro
let x = 5;
function f(){
 $(x);
 ++x; // `return x + 1; x = f();` sort of deal
}

f();
f();
$(x);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  $(x);
  const tmpPostUpdArgIdent /*:unknown*/ = x;
  x = tmpPostUpdArgIdent + 1;
  return undefined;
};
let x /*:primitive*/ = 5;
f();
f();
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(x);
  x = x + 1;
};
let x = 5;
f();
f();
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( b );
  const c = b;
  b = c + 1;
  return undefined;
};
let b = 5;
a();
a();
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(x);
  const tmpPostUpdArgIdent = $coerce(x, `number`);
  x = tmpPostUpdArgIdent + 1;
  return undefined;
};
let x = 5;
f();
f();
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 6
 - 3: 7
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
