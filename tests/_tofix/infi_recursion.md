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

## Pre Normal


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
$(f(427 + 1));
$(f(427 + 2));
$(f(427 + 3));
$(alias);
`````

## Normalized


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
const tmpCalleeParam$1 = 428;
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1);
$(tmpCalleeParam);
const tmpCallCallee$1 = f;
const tmpCalleeParam$5 = 429;
const tmpCalleeParam$3 = tmpCallCallee$1(tmpCalleeParam$5);
$(tmpCalleeParam$3);
const tmpCallCallee$3 = f;
const tmpCalleeParam$9 = 430;
const tmpCalleeParam$7 = tmpCallCallee$3(tmpCalleeParam$9);
$(tmpCalleeParam$7);
$(alias);
`````

## PST Settled
With rename=true

`````js filename=intro
throw "<max pcode call depth exceeded>; calling `const tmp = f(undefined, undefined);`";
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
