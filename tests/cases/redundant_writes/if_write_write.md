# Preval test case

# if_write_write.md

> Redundant writes > If write write
>
> In this case only the last write to x is relevant and the let should be moved down

In this case it's a closure so ref tracking logic is unsafe to apply without more checks

Counter case: the whole thing is try/catch and $(1) throws and x is a closure.

This would be observable:
  let x; try { if ($) x = 10; x = $(20); } catch { } $(x)

So it's not actually safe to do this in all situations. But most tho.
- Var is not a closure, or
- Code is not try/catch wrapped

## Input

`````js filename=intro
const f = function() {
  $(x); // It escapes. At call time. Source code order is irrelevant
};
let x = $; // Not observed, but closure
if ($) {
  x = {}; // Not observed
}
x = $(1);
$(x.headers);
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  $(x);
  return undefined;
};
const x /*:unknown*/ = $(1);
const tmpCalleeParam /*:unknown*/ = x.headers;
$(tmpCalleeParam);
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(x);
};
const x = $(1);
$(x.headers);
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( b );
  return undefined;
};
const b = $( 1 );
const c = b.headers;
$( c );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  $(x);
  return undefined;
};
let x = $;
if ($) {
  x = {};
} else {
}
x = $(1);
let tmpCalleeParam = x.headers;
$(tmpCalleeParam);
$(f);
`````


## Todos triggered


- (todo) support IfStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
