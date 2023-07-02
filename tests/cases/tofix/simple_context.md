# Preval test case

# simple_context.md

> Tofix > Simple context
>
> Inlining $dotCall cases when we know what they are actually doing

the context can be inlined easily and safely in this trivial case

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
  const tmpPrevalAliasThis = this;
  debugger;
  const x = tmpPrevalAliasThis;
  $(x);
};
f.call({ pass: 1 });
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
$dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam);
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
f.call(tmpCalleeParam);
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
