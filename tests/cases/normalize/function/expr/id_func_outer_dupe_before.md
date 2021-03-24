# Preval test case

# id_func_outer_dupe_before.md

> Normalize > Function > Expr > Id func outer dupe before
>
> Function expression ids should be eliminated

#TODO

## Input

`````js filename=intro
const g = 10;
function out() {
  const f = function g() {
    $(typeof g);
  };
  $(g, f());
}
out();
out();
`````

## Pre Normal

`````js filename=intro
let out = function () {
  debugger;
  const f = function g$1() {
    debugger;
    $(typeof g$1);
  };
  $(g, f());
};
const g = 10;
out();
out();
`````

## Normalized

`````js filename=intro
let out = function () {
  debugger;
  const g$1 = function () {
    debugger;
    const tmpCallCallee = $;
    const tmpCalleeParam = typeof g$1;
    tmpCallCallee(tmpCalleeParam);
  };
  const f = g$1;
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = g;
  const tmpCalleeParam$2 = f();
  tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
};
const g = 10;
out();
out();
`````

## Output

`````js filename=intro
const out = function () {
  debugger;
  const g$1 = function () {
    debugger;
    const tmpCalleeParam = typeof g$1;
    $(tmpCalleeParam);
  };
  const tmpCalleeParam$2 = g$1();
  $(10, tmpCalleeParam$2);
};
out();
out();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - 2: 10, undefined
 - 3: 'function'
 - 4: 10, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same