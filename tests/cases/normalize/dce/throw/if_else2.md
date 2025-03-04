# Preval test case

# if_else2.md

> Normalize > Dce > Throw > If else2
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    throw 2;
    $('fail');
  }
  throw 3;
  $('fail');
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
  throw 3;
  $(`fail`);
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
    throw 3;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  throw 2;
} else {
  throw 3;
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
  throw 3;
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
