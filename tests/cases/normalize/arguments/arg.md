# Preval test case

# arg.md

> Normalize > Arguments > Arg
>
> This was causing a problem when arguments was passed on in a call.

#TODO

## Input

`````js filename=intro
function f() {
  f.apply(this, arguments);
}
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpCallObj = f;
  const tmpCallVal = tmpCallObj.apply;
  const tmpCalleeParam = tmpPrevalAliasThis;
  const tmpCalleeParam$1 = tmpPrevalAliasArgumentsAny;
  tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
};
`````

## Output

`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpCallVal = f.apply;
  tmpCallVal.call(f, tmpPrevalAliasThis, tmpPrevalAliasArgumentsAny);
};
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
