# Preval test case

# backtoback_same_ident_if_return_true_false.md

> Normalize > If > Backtoback same ident if return true false
>
> Back to back if on same ident where first if has empty consequent and second if only has a return as consequent.

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if (x) {
  
  } else {
    x = $(0);
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
    x = $(0);
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
    x = $(0);
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
let tmpCalleeParam /*:unknown*/ = undefined;
const x /*:unknown*/ = $(1);
if (x) {
  tmpCalleeParam = x;
} else {
  const tmpClusterSSA_x /*:unknown*/ = $(0);
  if (tmpClusterSSA_x) {
    tmpCalleeParam = tmpClusterSSA_x;
  } else {
    const tmpReturnArg /*:unknown*/ = $(3);
    tmpCalleeParam = tmpReturnArg;
  }
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  a = b;
}
else {
  const c = $( 0 );
  if (c) {
    a = c;
  }
  else {
    const d = $( 3 );
    a = d;
  }
}
$( a );
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
