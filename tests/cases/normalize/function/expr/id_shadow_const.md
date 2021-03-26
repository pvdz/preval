# Preval test case

# id_shadow_const.md

> Normalize > Function > Expr > Id shadow const
>
> Function recursion by referencing a function expr id

#TODO

## Input

`````js filename=intro
const f = function r() {
  const r = 20; // Ignored. r is read-only but the write fails silently.
  $(typeof r);
  return r;
};
const x = f();
$(x, typeof f);
`````

## Pre Normal

`````js filename=intro
const f = function r() {
  debugger;
  const r$1 = 20;
  $(typeof r$1);
  return r$1;
};
const x = f();
$(x, typeof f);
`````

## Normalized

`````js filename=intro
const r = function () {
  debugger;
  const r$1 = 20;
  const tmpCallCallee = $;
  const tmpCalleeParam = typeof r$1;
  tmpCallCallee(tmpCalleeParam);
  return r$1;
};
const f = r;
const x = f();
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = x;
const tmpCalleeParam$3 = typeof f;
tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const r = function () {
  debugger;
  $('number');
  return 20;
};
const x = r();
const tmpCalleeParam$3 = typeof r;
$(x, tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number'
 - 2: 20, 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
