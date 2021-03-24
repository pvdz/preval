# Preval test case

# id_shadow_param.md

> Normalize > Function > Expr > Id shadow param
>
> Function recursion by referencing a function expr id

#TODO

## Input

`````js filename=intro
const f = function r(r) {
  $(typeof r);
  return r;
};
const x = f(10);
$(x, typeof f);
`````

## Pre Normal

`````js filename=intro
const f = function r$1($$0) {
  let r$1 = $$0;
  debugger;
  $(typeof r$1);
  return r$1;
};
const x = f(10);
$(x, typeof f);
`````

## Normalized

`````js filename=intro
const r$1 = function ($$0) {
  let r$2 = $$0;
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = typeof r$2;
  tmpCallCallee(tmpCalleeParam);
  return r$2;
};
const f = r$1;
const x = f(10);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = x;
const tmpCalleeParam$2 = typeof f;
tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const $clone$r__1$0_D10 = function ($$0) {
  debugger;
  $('number');
  return 10;
};
$('number');
const tmpCalleeParam$2 = typeof $clone$r__1$0_D10;
$(10, tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number'
 - 2: 10, 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same