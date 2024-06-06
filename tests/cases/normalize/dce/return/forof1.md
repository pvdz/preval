# Preval test case

# forof1.md

> Normalize > Dce > Return > Forof1
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
function f() {
  for (let x in {a: 1, b: 2}) {
    return $(1, 'return');
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
    return $(1, `return`);
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
    const tmpReturnArg = $(1, `return`);
    return tmpReturnArg;
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
const f = function () {
  debugger;
  let x = undefined;
  const tmpForInDeclRhs = { a: 1, b: 2 };
  for (x in tmpForInDeclRhs) {
    const tmpReturnArg = $(1, `return`);
    return tmpReturnArg;
  }
  $(`keep, do not eval`);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = undefined;
  const c = {
a: 1,
b: 2
  ;
  for (b in c) {
    const d = $( 1, "return" );
    return d;
  }
  $( "keep, do not eval" );
  return undefined;
};
const e = a();
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'return'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
