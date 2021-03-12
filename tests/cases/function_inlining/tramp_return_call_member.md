# Preval test case

# tramp_return_call_member.md

> Function inlining > Tramp return call member
>
> A function returning the call to another function

#TODO

## Input

`````js filename=intro
const g = function() {
  const y = String.toString();
  return y;
};
const f = function() {
  const x = g();
  return x;
};
const r = f();
$(r);
`````

## Normalized

`````js filename=intro
const g = function () {
  const y = String.toString();
  return y;
};
const f = function () {
  const x = g();
  return x;
};
const r = f();
$(r);
`````

## Output

`````js filename=intro
const r = String.toString();
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
