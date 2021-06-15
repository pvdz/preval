# Preval test case

# forin.md

> Normalize > Dce > Throw > Forin
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
function f() {
  for (let x in {a: 1, b: 2}) {
    throw $(1, 'throw');
    $('fail');
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  for (let x in { a: 1, b: 2 }) {
    throw $(1, `throw`);
    $(`fail`);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpForInDeclRhs = { a: 1, b: 2 };
  let x = undefined;
  for (x in tmpForInDeclRhs) {
    const tmpThrowArg = $(1, `throw`);
    throw tmpThrowArg;
  }
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let x = undefined;
const tmpForInDeclRhs = { a: 1, b: 2 };
for (x in tmpForInDeclRhs) {
  const tmpThrowArg = $(1, `throw`);
  throw tmpThrowArg;
}
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'throw'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
