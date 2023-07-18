# Preval test case

# backtoback_same_ident_if_return_true_true.md

> Normalize > If > Backtoback same ident if return true true
>
> Back to back if on same ident where first if has empty consequent and second if only has a return as consequent.

#TODO

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if (x) {
  
  } else {
    x = $(2);
  }
  if (x) {
    return x;
  } else {
    return $(3);
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
  } else {
    x = $(2);
  }
  if (x) {
    return x;
  } else {
    return $(3);
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
    return x;
  } else {
    x = $(2);
    if (x) {
      return x;
    } else {
      const tmpReturnArg = $(3);
      return tmpReturnArg;
    }
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
    return x;
  } else {
    const tmpClusterSSA_x = $(2);
    if (tmpClusterSSA_x) {
      return tmpClusterSSA_x;
    } else {
      const tmpReturnArg = $(3);
      return tmpReturnArg;
    }
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
    return b;
  }
  else {
    const c = $( 2 );
    if (c) {
      return c;
    }
    else {
      const d = $( 3 );
      return d;
    }
  }
},;
const e = a();
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
