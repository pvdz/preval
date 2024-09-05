# Preval test case

# implicit_window.md

> This > Implicit window
>
> A function that gets called with implicit `this` returns `undefined` in module code

## Options

- implicitThis=window
- skipEval=true

## Input

`````js filename=intro
function f() {
  return this;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  return tmpPrevalAliasThis;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  return tmpPrevalAliasThis;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
