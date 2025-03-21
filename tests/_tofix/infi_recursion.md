# Preval test case

# infi_recursion.md

> Tofix > infi recursion

This recursion case would result in an infinite transform loop before fixing it.

## Input

`````js filename=intro
const arr = [1, 2, 3, 4];
const f = function(a, b) {
  const tmp = f(a, b);
  return tmp;
};
const alias = f;
$(f(427 + 1));
$(f(427 + 2));
$(f(427 + 3));
$(alias);
`````


## Settled


`````js filename=intro
throw `<max pcode call depth exceeded>; calling \`const tmp = f(undefined, undefined);\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `<max pcode call depth exceeded>; calling \`const tmp = f(undefined, undefined);\``;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "<max pcode call depth exceeded>; calling `const tmp = f(undefined, undefined);`";
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
