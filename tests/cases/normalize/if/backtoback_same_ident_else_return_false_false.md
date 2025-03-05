# Preval test case

# backtoback_same_ident_else_return_false_false.md

> Normalize > If > Backtoback same ident else return false false
>
> Back to back if on same ident where first if has empty consequent and second if only has a return as consequent.

## Input

`````js filename=intro
function f() {
  let x = $(0);
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
  let x = $(0);
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
  let x = $(0);
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
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const x /*:unknown*/ = $(0);
if (x) {
  const tmpClusterSSA_x /*:unknown*/ = $(0);
  if (tmpClusterSSA_x) {
    const tmpReturnArg /*:unknown*/ = $(3);
    tmpCalleeParam = tmpReturnArg;
  } else {
    tmpCalleeParam = tmpClusterSSA_x;
  }
} else {
  tmpCalleeParam = x;
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 0 );
if (b) {
  const c = $( 0 );
  if (c) {
    const d = $( 3 );
    a = d;
  }
  else {
    a = c;
  }
}
else {
  a = b;
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
