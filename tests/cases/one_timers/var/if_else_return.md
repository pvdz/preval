# Preval test case

# if_else_return.md

> One timers > Var > If else return
>
> Return inlining

#TODO

## Input

`````js filename=intro
function f() {
  if ($()) {
    $(1);
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
    $(1);
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
    $(1);
    return undefined;
  } else {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  }
};
const x = f();
$(x);
`````

## Output


`````js filename=intro
let x = undefined;
const tmpIfTest = $();
if (tmpIfTest) {
  $(1);
} else {
  const tmpReturnArg = $(2);
  x = tmpReturnArg;
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $();
if (b) {
  $( 1 );
}
else {
  const c = $( 2 );
  a = c;
}
$( a );
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
