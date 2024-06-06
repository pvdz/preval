# Preval test case

# if_else_then_return.md

> One timers > Var > If else then return
>
> Return inlining

#TODO

## Input

`````js filename=intro
function f() {
  if ($()) {
    $(1);
  } else {
    $(2);
  }
  return $(3);
}
const x = f();
$(x);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($()) {
    $(1);
  } else {
    $(2);
  }
  return $(3);
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
    $(1);
  } else {
    $(2);
  }
  const tmpReturnArg = $(3);
  return tmpReturnArg;
};
const x = f();
$(x);
`````

## Output


`````js filename=intro
const tmpIfTest = $();
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
const tmpReturnArg = $(3);
$(tmpReturnArg);
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
const b = $( 3 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 2
 - 3: 3
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
