# Preval test case

# id_func_inner_no_dupe.md

> Normalize > Function > Expr > Id func inner no dupe
>
> Function expression ids should be eliminated

#TODO

## Input

`````js filename=intro
function out() {
  const f = function g() {
    $(typeof g);
  };
  $(typeof g, f());
}
out();
out();
`````

## Pre Normal

`````js filename=intro
let out = function () {
  debugger;
  const f = function g() {
    debugger;
    $(typeof g);
  };
  $(typeof g$1, f());
};
out();
out();
`````

## Normalized

`````js filename=intro
let out = function () {
  debugger;
  const g = function () {
    debugger;
    const tmpCallCallee = $;
    const tmpCalleeParam = typeof g;
    tmpCallCallee(tmpCalleeParam);
    return undefined;
  };
  const f = g;
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = typeof g$1;
  const tmpCalleeParam$3 = f();
  tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
  return undefined;
};
out();
out();
`````

## Output

`````js filename=intro
const g = function () {
  debugger;
  const tmpCalleeParam = typeof g;
  $(tmpCalleeParam);
  return undefined;
};
const out = function () {
  debugger;
  const tmpCalleeParam$1 = typeof g$1;
  g();
  $(tmpCalleeParam$1, undefined);
  return undefined;
};
out();
out();
`````

## Globals

BAD@! Found 1 implicit global bindings:

g$1

## Result

Should call `$` with:
 - 1: 'function'
 - 2: 'undefined', undefined
 - 3: 'function'
 - 4: 'undefined', undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
