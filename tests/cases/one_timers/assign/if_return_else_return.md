# Preval test case

# if_return_else_return.md

> One timers > Assign > If return else return
>
> Return inlining

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
    return $(1);
  } else {
    return $(2);
  }
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
    return $(1);
  } else {
    return $(2);
  }
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
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = $(2);
    return tmpReturnArg$1;
  }
};
let x = $(100);
const tmpCalleeParam = closure();
$(tmpCalleeParam);
x = f();
$(x);
const tmpCalleeParam$1 = closure();
$(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(100);
$(x);
let tmpClusterSSA_x /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  const tmpReturnArg /*:unknown*/ = $(1);
  tmpClusterSSA_x = tmpReturnArg;
  $(tmpReturnArg);
} else {
  const tmpReturnArg$1 /*:unknown*/ = $(2);
  tmpClusterSSA_x = tmpReturnArg$1;
  $(tmpReturnArg$1);
}
$(tmpClusterSSA_x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
let b = undefined;
const c = $();
if (c) {
  const d = $( 1 );
  b = d;
  $( d );
}
else {
  const e = $( 2 );
  b = e;
  $( e );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 
 - 4: 2
 - 5: 2
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
