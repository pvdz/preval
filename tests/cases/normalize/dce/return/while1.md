# Preval test case

# while1.md

> Normalize > Dce > Return > While1
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
function f() {
  while ($(true)) {
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
  while ($(true)) {
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
  let tmpIfTest = $(true);
  while (true) {
    if (tmpIfTest) {
      const tmpReturnArg = $(1, `return`);
      return tmpReturnArg;
    } else {
      break;
    }
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
  const tmpIfTest = $(true);
  if (tmpIfTest) {
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
  const b = $( true );
  if (b) {
    const c = $( 1, "return" );
    return c;
  }
  else {
    $( "keep, do not eval" );
    return undefined;
  }
};
const d = a();
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 1, 'return'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
