# Preval test case

# func_call.md

> Dot call > Func call
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
function f() {
  const x = this;
  $(x);
}
f.call({pass: 1}, 1, 2, 3, 'yep', $);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const x = tmpPrevalAliasThis;
  $(x);
};
f.call({ pass: 1 }, 1, 2, 3, `yep`, $);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const x = tmpPrevalAliasThis;
  $(x);
  return undefined;
};
const tmpCallObj = f;
const tmpCallVal = tmpCallObj.call;
const tmpCalleeParam = { pass: 1 };
const tmpCalleeParam$1 = 1;
const tmpCalleeParam$3 = 2;
const tmpCalleeParam$5 = 3;
const tmpCalleeParam$7 = `yep`;
const tmpCalleeParam$9 = $;
$dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7, tmpCalleeParam$9);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  $(tmpPrevalAliasThis);
  return undefined;
};
const tmpCalleeParam = { pass: 1 };
f.call(tmpCalleeParam, 1, 2, 3, `yep`, $);
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
