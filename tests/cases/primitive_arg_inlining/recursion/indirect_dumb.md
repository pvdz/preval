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
const g /*:(primitive)=>unknown*/ = function ($$0) {
  const n$1 /*:primitive*/ = $$0;
  debugger;
  const tmpCalleeParam /*:primitive*/ = n$1 + 1;
  const tmpReturnArg$1 /*:unknown*/ = g(tmpCalleeParam);
  return tmpReturnArg$1;
};
throw `<max pcode call depth exceeded>; calling \`const tmpCalleeParam\$1 = g(0);\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function (n$1) {
  const tmpReturnArg$1 = g(n$1 + 1);
  return tmpReturnArg$1;
};
throw `<max pcode call depth exceeded>; calling \`const tmpCalleeParam\$1 = g(0);\``;
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
throw "<max pcode call depth exceeded>; calling `const tmpCalleeParam$1 = g(0);`";
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ Maximum call stack size exceeded ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
