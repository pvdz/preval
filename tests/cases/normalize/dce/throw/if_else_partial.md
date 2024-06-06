# Preval test case

# if_else_partial.md

> Normalize > Dce > Throw > If else partial
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    throw 2;
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
  if ($(1)) {
    throw 2;
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
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    throw 2;
  } else {
    $(`keep, do not eval`);
    return undefined;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  throw 2;
} else {
  $(`keep, do not eval`);
  $(undefined);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  throw 2;
}
else {
  $( "keep, do not eval" );
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
