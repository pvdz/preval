# Preval test case

# dowhile2.md

> Normalize > Dce > Return > Dowhile2
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  do {
    return $(1, 'return');
    $('fail');
  } while ($(true));
  $('keep, do not eval');
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    {
      return $(1, `return`);
      $(`fail`);
    }
    if ($(true)) {
    } else {
      break;
    }
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
const tmpReturnArg = $(1, `return`);
$(tmpReturnArg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1, "return" );
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
