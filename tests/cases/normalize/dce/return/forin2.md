# Preval test case

# forin2.md

> Normalize > Dce > Return > Forin2
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
  $('keep, do not eval');
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
  $(`keep, do not eval`);
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
  let tmpForEntered = false;
  const tmpForOfDeclRhs = [10, 20];
  for (x of tmpForOfDeclRhs) {
    tmpForEntered = true;
    break;
  }
  if (tmpForEntered) {
    const tmpReturnArg = $(1, `return`);
    return tmpReturnArg;
  } else {
    $(`keep, do not eval`);
    return undefined;
  }
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
  let c = false;
  const d = [ 10, 20,, ];
  for (b of d {
    c = true;
    break;
  }
  if (c) {
    const e = $( 1, "return" );
    return e;
  }
  else {
    $( "keep, do not eval" );
    return undefined;
  }
},;
const f = a();
$( f );
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
