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

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let n = $$0;
  debugger;
  return g(n);
};
let g = function ($$0) {
  let n$1 = $$0;
  debugger;
  return f(n$1 + 1);
};
$(f(0));
`````

## Normalized


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
  const tmpCalleeParam = n$1 + 1;
  const tmpReturnArg$1 = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg$1;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(0);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const g /*:(unknown)=>?*/ = function ($$0) {
  const n$1 = $$0;
  debugger;
  const tmpCalleeParam /*:primitive*/ = n$1 + 1;
  const tmpReturnArg$1 = g(tmpCalleeParam);
  return tmpReturnArg$1;
};
throw `<max pcode call depth exceeded>; calling \`const tmpCalleeParam\$1 = g(0);\``;
`````

## PST Output

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

## Result

Should call `$` with:
 - eval returned: ('<crash[ Maximum call stack size exceeded ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
