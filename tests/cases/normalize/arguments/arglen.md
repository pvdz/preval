# Preval test case

# arglen.md

> Normalize > Arguments > Arglen
>
> This was causing a problem when arguments was passed on in a call.

#TODO

## Input

`````js filename=intro
function f() {
  f.apply(this, arguments.length);
}
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpPrevalArgLengthAlias = arguments.length;
  const tmpPrevalThisAlias = this;
  const tmpCallObj = f;
  const tmpCallVal = tmpCallObj.apply;
  const tmpCalleeParam = tmpPrevalThisAlias;
  const tmpCalleeParam$1 = tmpPrevalArgLengthAlias;
  tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
};
`````

## Output

`````js filename=intro
const f = function () {
  const tmpPrevalThisAlias$1 = this;
  const tmpPrevalArgLengthAlias = arguments.length;
  const tmpPrevalThisAlias = tmpPrevalThisAlias$1;
  const tmpCallVal = f.apply;
  tmpCallVal.call(f, tmpPrevalThisAlias, tmpPrevalArgLengthAlias);
};
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
