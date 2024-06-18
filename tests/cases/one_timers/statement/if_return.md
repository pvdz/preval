# Preval test case

# if_return.md

> One timers > Statement > If return
>
> Return inlining

## Input

`````js filename=intro
function f() {
  if ($()) {
    return $(1);
  }
}
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($()) {
    return $(1);
  }
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  } else {
    return undefined;
  }
};
f();
`````

## Output


`````js filename=intro
const tmpIfTest = $();
if (tmpIfTest) {
  $(1);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 1 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
