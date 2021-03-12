# Preval test case

# func.md

> Normalize > This > Func
>
> A constant set to null should be eliminated

Note: in strict mode this in global is gonna be bad.

#TODO

## Input

`````js filename=intro
function f() {
  const x = this;
  return x;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const x = this;
  return x;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  const x = tmpPrevalAliasThis;
  return x;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  return tmpPrevalAliasThis;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
