# Preval test case

# closure_to_unreachable_closure.md

> Static arg ops > Assignment > Closure to unreachable closure
>
>

## Input

`````js filename=intro
let f; 
if ($) {
  let a = $();
  let b = $(); 
  f = function() {
    b = a;
    $(a);
    $(b);
  }
}
f(1);
f(2);
`````


## Settled


`````js filename=intro
if ($) {
  const a /*:unknown*/ = $();
  $();
  let b /*:unknown*/ = a;
  const f /*:()=>undefined*/ = function () {
    debugger;
    $(a);
    $(b);
    return undefined;
  };
  f();
  b = a;
  f();
} else {
  throw `[Preval] Attempting to call a value that cannot be called: \`undefined(1);\``;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const a = $();
  $();
  let b = a;
  const f = function () {
    $(a);
    $(b);
  };
  f();
  b = a;
  f();
} else {
  throw `[Preval] Attempting to call a value that cannot be called: \`undefined(1);\``;
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $();
  $();
  let b = a;
  const c = function() {
    debugger;
    $( a );
    $( b );
    return undefined;
  };
  c();
  b = a;
  c();
}
else {
  throw "[Preval] Attempting to call a value that cannot be called: `undefined(1);`";
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = undefined;
if ($) {
  let a = $();
  let b = $();
  f = function () {
    debugger;
    b = a;
    $(a);
    $(b);
    return undefined;
  };
  f(1);
  f(2);
} else {
  f(1);
  f(2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 
 - 3: undefined
 - 4: undefined
 - 5: undefined
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
