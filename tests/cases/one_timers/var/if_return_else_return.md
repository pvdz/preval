# Preval test case

# if_return_else_return.md

> One timers > Var > If return else return
>
> Return inlining

#TODO

## Input

`````js filename=intro
function f() {
  if ($()) {
    return $(1);
  } else {
    return $(2);
  }
}
const x = f();
$(x);
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
const x = f();
$(x);
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
const x = f();
$(x);
`````

## Output

`````js filename=intro
const f = function () {
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
    const c = $( 1 );
    return c;
  }
  else {
    const d = $( 2 );
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
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
