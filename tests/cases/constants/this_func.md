# Preval test case

# null.md

> constants > null
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

## Normalized

`````js filename=intro
function f() {
  const x = this;
  $(x);
}
const tmpCallObj = f;
const tmpCallVal = tmpCallObj.call;
const tmpCalleeParam = { pass: 1 };
tmpCallVal.call(tmpCallObj, tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const x = this;
  $(x);
}
const tmpCallVal = f.call;
const tmpCalleeParam = { pass: 1 };
tmpCallVal.call(f, tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { pass: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
