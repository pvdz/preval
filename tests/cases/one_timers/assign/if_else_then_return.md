# Preval test case

# if_else_then_return.md

> One timers > Assign > If else then return
>
> Return inlining

#TODO

## Input

`````js filename=intro
let x = $(100);
function closure() {
  // This serves to keep x from being eliminated/SSA'd
  return x;
}
$(closure());

function f() {
  if ($()) {
    $(1);
  } else {
    $(2);
  }
  return $(3);
}

x = f(); // This x should not be SSA'd due to the closure
$(x);
$(closure());
`````

## Pre Normal


`````js filename=intro
let closure = function () {
  debugger;
  return x;
};
let f = function () {
  debugger;
  if ($()) {
    $(1);
  } else {
    $(2);
  }
  return $(3);
};
let x = $(100);
$(closure());
x = f();
$(x);
$(closure());
`````

## Normalized


`````js filename=intro
let closure = function () {
  debugger;
  return x;
};
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
let x = $(100);
const tmpCallCallee = $;
const tmpCalleeParam = closure();
tmpCallCallee(tmpCalleeParam);
x = f();
$(x);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = closure();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const x = $(100);
$(x);
const tmpIfTest = $();
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
const tmpReturnArg = $(3);
$(tmpReturnArg);
$(tmpReturnArg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
const b = $();
if (b) {
  $( 1 );
}
else {
  $( 2 );
}
const c = $( 3 );
$( c );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 
 - 4: 2
 - 5: 3
 - 6: 3
 - 7: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
