# Preval test case

# backtoback_same_ident_else_return_true_true.md

> Normalize > If > Backtoback same ident else return true true
>
> Back to back if on same ident where first if has empty consequent and second if only has a return as consequent.

#TODO

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if (x) {
    x = $(2);
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
    x = $(2);
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
    x = $(2);
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
let tmpCalleeParam = undefined;
const x = $(1);
if (x) {
  const tmpClusterSSA_x = $(2);
  if (tmpClusterSSA_x) {
    const tmpReturnArg = $(3);
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
const b = $( 1 );
if (b) {
  const c = $( 2 );
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
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
