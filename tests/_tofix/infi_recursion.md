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
throw `<max pcode call depth exceeded>; calling \`const tmp\$5 = f(428, undefined);\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `<max pcode call depth exceeded>; calling \`const tmp\$5 = f(428, undefined);\``;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "<max pcode call depth exceeded>; calling `const tmp$5 = f(428, undefined);`";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3, 4];
const f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const tmp = f(a, b);
  return tmp;
};
const alias = f;
const tmpCallCallee = f;
let tmpCalleeParam$1 = 428;
let tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
const tmpCallCallee$1 = f;
let tmpCalleeParam$5 = 429;
let tmpCalleeParam$3 = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
const tmpCallCallee$3 = f;
let tmpCalleeParam$9 = 430;
let tmpCalleeParam$7 = f(tmpCalleeParam$9);
$(tmpCalleeParam$7);
$(alias);
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
