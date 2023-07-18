# Preval test case

# if_return.md

> One timers > Var > If return
>
> Return inlining

#TODO

## Input

`````js filename=intro
function f() {
  if ($()) {
    return $(1);
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
    return undefined;
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
    return undefined;
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
    return undefined;
  }
},;
const d = a();
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
