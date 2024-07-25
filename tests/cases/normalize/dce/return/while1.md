# Preval test case

# while1.md

> Normalize > Dce > Return > While1
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

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
  while (true) {
    const tmpIfTest = $(true);
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
let tmpCalleeParam = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpReturnArg = $(1, `return`);
  tmpCalleeParam = tmpReturnArg;
} else {
  $(`keep, do not eval`);
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( true );
if (b) {
  const c = $( 1, "return" );
  a = c;
}
else {
  $( "keep, do not eval" );
}
$( a );
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
