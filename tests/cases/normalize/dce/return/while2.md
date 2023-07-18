# Preval test case

# while2.md

> Normalize > Dce > Return > While2
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
function f() {
  while ($(true)) {
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
  while ($(true)) {
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
const tmpIfTest = $(true);
const tmpLabeledBlockFunc = function ($$0) {
  const tmpIfTest$3 = $$0;
  debugger;
  if (tmpIfTest$3) {
    const tmpReturnArg$5 = $(1, `return`);
    return tmpReturnArg$5;
  } else {
    $(`keep, do not eval`);
    return undefined;
  }
};
const tmpReturnArg$9 = tmpLabeledBlockFunc(tmpIfTest);
$(tmpReturnArg$9);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
const b = function($$0 ) {
  const c = d;
  debugger;
  if (c) {
    const e = $( 1, "return" );
    return e;
  }
  else {
    $( "keep, do not eval" );
    return undefined;
  }
},;
const f = b( a );
$( f );
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
