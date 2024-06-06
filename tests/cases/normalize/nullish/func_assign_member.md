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
const y = $();
const tmpIfTest = y == null;
if (tmpIfTest) {
  foo;
  const tmpClusterSSA_tmpReturnArg = $(foo);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpClusterSSA_tmpReturnArg$1 = $(y);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = a == null;
if (b) {
  foo;
  const c = $( foo );
  $( c );
}
else {
  const d = $( a );
  $( d );
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
