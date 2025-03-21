# Preval test case

# _base.md

> Primitive arg inlining > Recursion > Base
>
> Recursion problems

## Options

- cloneLimit=5

## Input

`````js filename=intro
function f(n) {
  return f(n + 1);
}
$(f(0));
`````


## Settled


`````js filename=intro
const f /*:(primitive)=>unknown*/ = function ($$0) {
  const n /*:primitive*/ = $$0;
  debugger;
  const tmpCalleeParam /*:primitive*/ = n + 1;
  const tmpReturnArg /*:unknown*/ = f(tmpCalleeParam);
  return tmpReturnArg;
};
throw `<max pcode call depth exceeded>; calling \`const tmpCalleeParam\$1 = f(0);\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (n) {
  const tmpReturnArg = f(n + 1);
  return tmpReturnArg;
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
