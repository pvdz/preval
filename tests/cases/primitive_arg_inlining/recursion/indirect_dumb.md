# Preval test case

# indirect_dumb.md

> Primitive arg inlining > Recursion > Indirect dumb
>
> Recursion problems

This is an infinite loop. It should not throw Preval in an endless loop.

## Input

`````js filename=intro
function f(n) {
  return g(n);
}
function g(n) {
  return f(n+1);
}
$(f(0));
`````


## Settled


`````js filename=intro
const f /*:(primitive)=>unknown*/ = function ($$0) {
  const n$2 /*:primitive*/ = $$0;
  debugger;
  const tmpCalleeParam /*:primitive*/ = n$2 + 1;
  const tmpClusterSSA_tmpReturnArg /*:unknown*/ = f(tmpCalleeParam);
  return tmpClusterSSA_tmpReturnArg;
};
throw `<max pcode call depth exceeded>; calling \`const tmpCalleeParam\$1 = f(0);\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (n$2) {
  const tmpClusterSSA_tmpReturnArg = f(n$2 + 1);
  return tmpClusterSSA_tmpReturnArg;
};
throw `<max pcode call depth exceeded>; calling \`const tmpCalleeParam\$1 = f(0);\``;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = b + 1;
  const d = a( c );
  return d;
};
throw "<max pcode call depth exceeded>; calling `const tmpCalleeParam$1 = f(0);`";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let n = $$0;
  debugger;
  const tmpReturnArg = g(n);
  return tmpReturnArg;
};
let g = function ($$0) {
  let n$1 = $$0;
  debugger;
  const tmpCallCallee = f;
  let tmpCalleeParam = n$1 + 1;
  const tmpReturnArg$1 = f(tmpCalleeParam);
  return tmpReturnArg$1;
};
let tmpCalleeParam$1 = f(0);
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ Maximum call stack size exceeded ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
