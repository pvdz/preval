# Preval test case

# if_else_partial2.md

> Normalize > Dce > Throw > If else partial2
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  if ($(1)) {
  } else {
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
  } else {
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
    $(`keep, do not eval`);
    return undefined;
  } else {
    throw 2;
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
  $(`keep, do not eval`);
  $(undefined);
} else {
  throw 2;
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( "keep, do not eval" );
  $( undefined );
}
else {
  throw 2;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'keep, do not eval'
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
