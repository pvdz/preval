# Preval test case

# else.md

> If tail extending > Else
>
> The else should also work

## Input

`````js filename=intro
function f() {
  if ($) {}
  else { return }
  $('x')
}
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
  } else {
    return;
  }
  $(`x`);
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    $(`x`);
    return undefined;
  } else {
    return undefined;
  }
};
f();
`````

## Output


`````js filename=intro
if ($) {
  $(`x`);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( "x" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
