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

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let n = $$0;
  debugger;
  return f(n + 1);
};
$(f(0));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let n = $$0;
  debugger;
  const tmpCallCallee = f;
  const tmpCalleeParam = n + 1;
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(0);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const f /*:(unknown)=>?*/ = function ($$0) {
  const n = $$0;
  debugger;
  const tmpCalleeParam /*:primitive*/ = n + 1;
  const tmpReturnArg = f(tmpCalleeParam);
  return tmpReturnArg;
};
throw `<max pcode call depth exceeded>; calling \`const tmpCalleeParam\$1 = f(0);\``;
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
throw "<max pcode call depth exceeded>; calling `const tmpCalleeParam$1 = f(0);`";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Maximum call stack size exceeded ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
