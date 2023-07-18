# Preval test case

# if_else_return_return.md

> One timers > Var > If else return return
>
> Return inlining

#TODO

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
const f = function () {
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

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $();
  if (b) {
    $( 0 );
    const c = $( 2 );
    return c;
  }
  else {
    const d = $( 1 );
    return d;
  }
},;
const e = a();
$( e );
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
