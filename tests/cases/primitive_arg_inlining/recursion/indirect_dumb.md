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
throw `<max pcode call depth exceeded>; calling \`const tmpCalleeParam\$1 = f(0);\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `<max pcode call depth exceeded>; calling \`const tmpCalleeParam\$1 = f(0);\``;
`````


## PST Settled
With rename=true

`````js filename=intro
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


- (todo) support Identifier as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ Maximum call stack size exceeded ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
