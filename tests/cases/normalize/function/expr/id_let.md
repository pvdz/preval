# Preval test case

# id_let.md

> Normalize > Function > Expr > Id let
>
> Function recursion by referencing a function expr id

#TODO

## Input

`````js filename=intro
let f = function r() {
  $(typeof r);
  return r;
};
const x = f();
$(x, typeof f);
`````

## Pre Normal

`````js filename=intro
let f = function r() {
  debugger;
  $(typeof r);
  return r;
};
const x = f();
$(x, typeof f);
`````

## Normalized

`````js filename=intro
const r = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = typeof r;
  tmpCallCallee(tmpCalleeParam);
  return r;
};
let f = r;
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
  const tmpCalleeParam = typeof r;
  $(tmpCalleeParam);
  return r;
};
const x = r();
const tmpCalleeParam$2 = typeof r;
$(x, tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - 2: '<function>', 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
