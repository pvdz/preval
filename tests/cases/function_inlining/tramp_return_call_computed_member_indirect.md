# Preval test case

# tramp_return_call_computed_member_indirect.md

> Function inlining > Tramp return call computed member indirect
>
> A function returning the call to another function

#TODO

## Input

`````js filename=intro
const toString = $('toString');
const g = function(o, p) {
  const y = o[p]();
  return y;
};
const f = function(m, n) {
  const x = g(m, n);
  return x;
};
const r = f(String, toString);
$(r);
`````

## Normalized

`````js filename=intro
const toString = $('toString');
const g = function (o, p) {
  const y = o[p]();
  return y;
};
const f = function (m, n) {
  const x = g(m, n);
  return x;
};
const r = f(String, toString);
$(r);
`````

## Output

`````js filename=intro
const toString = $('toString');
const g = function (o, p) {
  const y = o[p]();
  return y;
};
const f = function (m, n) {
  const x = g(m, n);
  return x;
};
const r = f(String, toString);
$(r);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'toString'
 - 2: 'function() { [native code] }'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
