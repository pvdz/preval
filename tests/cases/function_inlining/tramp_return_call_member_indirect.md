# Preval test case

# tramp_return_call_member_indirect.md

> Function inlining > Tramp return call member indirect
>
> A function returning the call to another function

#TODO

## Input

`````js filename=intro
const g = function(b) {
  const y = b.toString();
  return y;
};
const f = function(a) {
  const x = g(a);
  return x;
};
const r = f(String);
$(r);
`````

## Normalized

`````js filename=intro
const g = function (b) {
  const y = b.toString();
  return y;
};
const f = function (a) {
  const x = g(a);
  return x;
};
const r = f(String);
$(r);
`````

## Output

`````js filename=intro
const g = function (b) {
  const y = b.toString();
  return y;
};
const f = function (a) {
  const x = g(a);
  return x;
};
const r = f(String);
$(r);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function() { [native code] }'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
