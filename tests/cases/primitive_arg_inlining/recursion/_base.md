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
  const tmpCallCallee = f;
  let tmpCalleeParam = n + 1;
  const tmpReturnArg = f(tmpCalleeParam);
  return tmpReturnArg;
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
