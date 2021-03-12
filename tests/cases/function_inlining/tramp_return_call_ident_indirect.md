# Preval test case

# tramp_return_call_ident_indirect.md

> Function inlining > Tramp return call ident indirect
>
> A function returning the call to another function

#TODO

## Input

`````js filename=intro
const g = function(a) {
  const y = a(10);
  return y;
};
const f = function(b) {
  const x = g(b);
  return x;
};
const r = f($);
$(r);
`````

## Pre Normal

`````js filename=intro
const g = function (a) {
  const y = a(10);
  return y;
};
const f = function (b) {
  const x = g(b);
  return x;
};
const r = f($);
$(r);
`````

## Normalized

`````js filename=intro
const g = function (a) {
  const y = a(10);
  return y;
};
const f = function (b) {
  const x = g(b);
  return x;
};
const r = f($);
$(r);
`````

## Output

`````js filename=intro
const r = $(10);
$(r);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
