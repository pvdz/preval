# Preval test case

# closure_after_escapes.md

> Ssa > Closure after escapes
>
> Contrived example

The closure prevents SSA if the function that contains it "escapes"

## Input

`````js filename=intro
function f() {
  let x = $(5);
  const g = function() {
    return x;
  };
  $(x);
  x = $(10);
  $(x);
  // "escaped" because preval can no longer guarantee anything
  $(g);
}
if ($) $(f());
`````


## Settled


`````js filename=intro
if ($) {
  let x /*:unknown*/ = $(5);
  const g /*:()=>unknown*/ = function () {
    debugger;
    return x;
  };
  $(x);
  x = $(10);
  $(x);
  $(g);
  $(undefined);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  let x = $(5);
  const g = function () {
    return x;
  };
  $(x);
  x = $(10);
  $(x);
  $(g);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  let a = $( 5 );
  const b = function() {
    debugger;
    return a;
  };
  $( a );
  a = $( 10 );
  $( a );
  $( b );
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = $(5);
  const g = function () {
    debugger;
    return x;
  };
  $(x);
  x = $(10);
  $(x);
  $(g);
  return undefined;
};
if ($) {
  let tmpCalleeParam = f();
  $(tmpCalleeParam);
} else {
}
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 5
 - 3: 10
 - 4: 10
 - 5: '<function>'
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
