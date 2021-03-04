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

## Normalized

`````js filename=intro
let f = function () {
  const tmpPrevalThisAlias = this;
  const x = tmpPrevalThisAlias;
  $(x);
};
const tmpCallObj = f;
const tmpCallVal = tmpCallObj.call;
const tmpCalleeParam = { pass: 1 };
tmpCallVal.call(tmpCallObj, tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpPrevalThisAlias = this;
  $(tmpPrevalThisAlias);
};
const tmpCallVal = f.call;
const tmpCalleeParam = { pass: 1 };
tmpCallVal.call(f, tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { pass: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
