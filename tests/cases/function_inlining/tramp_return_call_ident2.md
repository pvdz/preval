# Preval test case

# tramp_return_call_ident2.md

> Function inlining > Tramp return call ident2
>
> A function returning the call to another function

#TODO

## Input

`````js filename=intro
const f = function() {
  const x = $();
  return x;
};
const r = f();
$(r);
`````

## Pre Normal

`````js filename=intro
const f = function () {
  const x = $();
  return x;
};
const r = f();
$(r);
`````

## Normalized

`````js filename=intro
const f = function () {
  const x = $();
  return x;
};
const r = f();
$(r);
`````

## Output

`````js filename=intro
const r = $();
$(r);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
