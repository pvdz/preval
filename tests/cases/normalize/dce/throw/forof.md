# Preval test case

# forof.md

> Normalize > Dce > Throw > Forof
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
function f() {
  for (let x of [10, 20]) {
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
  for (let x of [10, 20]) {
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
  const tmpForOfDeclRhs = [10, 20];
  let x = undefined;
  for (x of tmpForOfDeclRhs) {
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
let tmpForEntered = false;
const tmpForOfDeclRhs = [10, 20];
for (x of tmpForOfDeclRhs) {
  tmpForEntered = true;
  break;
}
if (tmpForEntered) {
  const tmpThrowArg = $(1, `throw`);
  throw tmpThrowArg;
} else {
  $(undefined);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
let b = false;
const c = [ 10, 20,, ];
for (a of c {
  b = true;
  break;
}
if (b) {
  const d = $( 1, "throw" );
  throw d;
}
else {
  $( undefined );
}
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
