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
  const tmpClusterSSA_f /*:()=>undefined*/ = function () {
    debugger;
    $(a);
    $(b);
    return undefined;
  };
  tmpClusterSSA_f();
  b = a;
  tmpClusterSSA_f();
} else {
  const tmpThrowArg /*:object*/ /*truthy*/ = new $typeError_constructor(
    `[Preval] Attempting to call a value that cannot be called: \`undefined(1);\``,
  );
  throw tmpThrowArg;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const a = $();
  $();
  let b = a;
  const tmpClusterSSA_f = function () {
    $(a);
    $(b);
  };
  tmpClusterSSA_f();
  b = a;
  tmpClusterSSA_f();
} else {
  const tmpThrowArg = new $typeError_constructor(`[Preval] Attempting to call a value that cannot be called: \`undefined(1);\``);
  throw tmpThrowArg;
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
  const d = new $typeError_constructor( "[Preval] Attempting to call a value that cannot be called: `undefined(1);`" );
  throw d;
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


- (todo) support ExpressionStatement as statement in let_hoisting noob check


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
