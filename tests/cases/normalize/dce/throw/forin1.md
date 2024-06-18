# Preval test case

# forin1.md

> Normalize > Dce > Throw > Forin1
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
function f() {
  for (let x in {a: 1, b: 2}) {
    throw $(1, 'return');
  }
  $('keep, do not eval');
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  for (let x in { a: 1, b: 2 }) {
    throw $(1, `return`);
  }
  $(`keep, do not eval`);
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
    const tmpThrowArg = $(1, `return`);
    throw tmpThrowArg;
  }
  $(`keep, do not eval`);
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
  const tmpThrowArg = $(1, `return`);
  throw tmpThrowArg;
}
$(`keep, do not eval`);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = {
  a: 1,
  b: 2,
};
for (a in b) {
  const c = $( 1, "return" );
  throw c;
}
$( "keep, do not eval" );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'return'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
