# Preval test case

# this_func.md

> Constants > This func
>
> A constant set to null should be eliminated

Note: in strict mode this in global is gonna be bad.

#TODO

## Input

`````js filename=intro
function f() {
    const x = this;
    $(x);
}
f.call({pass: 1});
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const tmpthis = this;
  debugger;
  const x = tmpthis;
  $(x);
};
f.call({ pass: 1 });
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpthis = this;
  debugger;
  const x = tmpthis;
  $(x);
  return undefined;
};
const tmpCallObj = f;
const tmpCallVal = tmpCallObj.call;
const tmpCalleeParam = { pass: 1 };
$dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpthis = this;
  debugger;
  $(tmpthis);
  return undefined;
};
const tmpCallVal = f.call;
const tmpCalleeParam = { pass: 1 };
$dotCall(tmpCallVal, f, tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { pass: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
