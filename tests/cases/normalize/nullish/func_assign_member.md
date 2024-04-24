# Preval test case

# func_assign_member.md

> Normalize > Nullish > Func assign member
>
> Assignment of a member expression where the object is a sequence

This could appear and is most likely a transformation artifact.

## Input

`````js filename=intro
function f() {
  var y;
  y = (1, 2, $())??foo;
  return $(y);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  y = (1, 2, $()) ?? foo;
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  y = $();
  const tmpIfTest = y == null;
  if (tmpIfTest) {
    y = foo;
  } else {
  }
  const tmpReturnArg = $(y);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let y = $();
const tmpIfTest = y == null;
let tmpReturnArg = undefined;
if (tmpIfTest) {
  y = foo;
  tmpReturnArg = $(y);
  $(tmpReturnArg);
} else {
  tmpReturnArg = $(y);
  $(tmpReturnArg);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $();
const b = a == null;
let c = undefined;
if (b) {
  a = foo;
  c = $( a );
  $( c );
}
else {
  c = $( a );
  $( c );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

foo

## Result

Should call `$` with:
 - 1: 
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
