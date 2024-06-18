# Preval test case

# if_return_else_return.md

> One timers > Statement > If return else return
>
> Return inlining

## Input

`````js filename=intro
function f() {
  if ($()) {
    return $(1);
  } else {
    return $(2);
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
  } else {
    return $(2);
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
    const tmpReturnArg$1 = $(2);
    return tmpReturnArg$1;
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
  $(2);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 1 );
}
else {
  $( 2 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
