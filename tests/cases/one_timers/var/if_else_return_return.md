# Preval test case

# if_else_return_return.md

> One timers > Var > If else return return
>
> Return inlining

## Input

`````js filename=intro
function f() {
  if ($()) {
    $(0);
  } else {
    return $(1);
  }
  return $(2);
}
const x = f();
$(x);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($()) {
    $(0);
  } else {
    return $(1);
  }
  return $(2);
};
const x = f();
$(x);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    $(0);
    const tmpReturnArg$1 = $(2);
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  }
};
const x = f();
$(x);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  $(0);
  const tmpReturnArg$1 /*:unknown*/ = $(2);
  $(tmpReturnArg$1);
} else {
  const tmpReturnArg /*:unknown*/ = $(1);
  $(tmpReturnArg);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 0 );
  const b = $( 2 );
  $( b );
}
else {
  const c = $( 1 );
  $( c );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
