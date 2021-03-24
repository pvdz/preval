# Preval test case

# id_shadow_let_assign.md

> Normalize > Function > Expr > Id shadow let assign
>
> Function recursion by referencing a function expr id

#TODO

## Input

`````js filename=intro
const f = function r() {
  let r = 20; // Ignored. r is read-only but the write fails silently.
  r = 30;
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
  let r$1 = 20;
  r$1 = 30;
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
  let r$1 = 20;
  r$1 = 30;
  const tmpCallCallee = $;
  const tmpCalleeParam = typeof r$1;
  tmpCallCallee(tmpCalleeParam);
  return r$1;
};
const f = r;
const x = f();
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = x;
const tmpCalleeParam$2 = typeof f;
tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const r = function () {
  debugger;
  $('number');
  return 30;
};
const x = r();
const tmpCalleeParam$2 = typeof r;
$(x, tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number'
 - 2: 30, 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
