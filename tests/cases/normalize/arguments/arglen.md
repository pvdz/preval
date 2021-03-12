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
  const tmpPrevalAliasArgumentsLen = arguments.length;
  const tmpPrevalAliasThis = this;
  f.apply(tmpPrevalAliasThis, tmpPrevalAliasArgumentsLen);
};
`````

## Output

`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis$1 = this;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  const tmpPrevalAliasThis = tmpPrevalAliasThis$1;
  f.apply(tmpPrevalAliasThis, tmpPrevalAliasArgumentsLen);
};
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
