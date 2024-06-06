# Preval test case

# backtoback_same_ident_else_return_true_false.md

> Normalize > If > Backtoback same ident else return true false
>
> Back to back if on same ident where first if has empty consequent and second if only has a return as consequent.

#TODO

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if (x) {
    x = $(0);
  } else {
  
  }
  if (x) {
    return $(3);
  } else {
    return x;
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if (x) {
    x = $(0);
  } else {
  }
  if (x) {
    return $(3);
  } else {
    return x;
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if (x) {
    x = $(0);
    if (x) {
      const tmpReturnArg = $(3);
      return tmpReturnArg;
    } else {
      return x;
    }
  } else {
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  const x = $(1);
  if (x) {
    const tmpClusterSSA_x = $(0);
    if (tmpClusterSSA_x) {
      const tmpReturnArg = $(3);
      return tmpReturnArg;
    } else {
      return tmpClusterSSA_x;
    }
  } else {
    return x;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  if (b) {
    const c = $( 0 );
    if (c) {
      const d = $( 3 );
      return d;
    }
    else {
      return c;
    }
  }
  else {
    return b;
  }
};
const e = a();
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
