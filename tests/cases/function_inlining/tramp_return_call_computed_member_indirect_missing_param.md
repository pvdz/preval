# Preval test case

# tramp_return_call_computed_member_indirect_missing_param.md

> Function inlining > Tramp return call computed member indirect missing param
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
  const x = g(m); // Missing param (!)
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
  const x = g(m);
  return x;
};
const r = f(String, toString);
$(r);
`````

## Output

`````js filename=intro
$('toString');
const r = String[undefined]();
$(r);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'toString'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
