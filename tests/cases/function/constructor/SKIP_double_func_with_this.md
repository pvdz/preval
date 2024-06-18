# Preval test case

# SKIP_double_func_with_this.md

> Function > Constructor > SKIP double func with this
>
> This regression threw over using the `tmpThis` name twice

## Input

`````js filename=intro
const a = Function(`return this`);
$(a());
const b = Function(`return this`);
$(b());
`````

## Pre Normal

`````js filename=intro
const a = Function(`return this`);
$(a());
const b = Function(`return this`);
$(b());
`````

## Normalized

`````js filename=intro
const a = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  return tmpPrevalAliasThis;
};
const tmpCallCallee = $;
const tmpCalleeParam = a();
tmpCallCallee(tmpCalleeParam);
const b = function () {
  const tmpPrevalAliasThis$1 = this;
  debugger;
  return tmpPrevalAliasThis$1;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = b();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const a = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  return tmpPrevalAliasThis;
};
const tmpCalleeParam = a();
$(tmpCalleeParam);
const b = function () {
  const tmpPrevalAliasThis$1 = this;
  debugger;
  return tmpPrevalAliasThis$1;
};
const tmpCalleeParam$1 = b();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Maximum call stack size exceeded ]>')

Pre normalization calls: Same

Normalized calls: BAD?!
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Final output calls: BAD!!
 - 1: undefined
 - 2: undefined
 - eval returned: undefined
