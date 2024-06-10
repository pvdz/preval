# Preval test case

# forof.md

> Normalize > Dce > Return > Forof
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
function f() {
  for (let x of [10, 20]) {
    return $(1, 'return');
    $('fail');
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  for (let x of [10, 20]) {
    return $(1, `return`);
    $(`fail`);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpForOfDeclRhs = [10, 20];
  let x = undefined;
  for (x of tmpForOfDeclRhs) {
    const tmpReturnArg = $(1, `return`);
    return tmpReturnArg;
  }
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam = undefined;
$inlinedFunction: {
  let x = undefined;
  const tmpForOfDeclRhs = [10, 20];
  for (x of tmpForOfDeclRhs) {
    const tmpReturnArg = $(1, `return`);
    tmpCalleeParam = tmpReturnArg;
    break $inlinedFunction;
  }
  tmpCalleeParam = undefined;
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
$inlinedFunction: {
  let b = undefined;
  const c = [ 10, 20 ];
  for (b of c) {
    const d = $( 1, "return" );
    a = d;
    break $inlinedFunction;
  }
  a = undefined;
}
$( a );
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
