# Preval test case

# func_group_member.md

> Normalize > Nullish > Func group member
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, $())??foo
  return $(y);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const y = (1, 2, $()) ?? foo;
  return $(y);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let y = $();
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
const y /*:unknown*/ = $();
const tmpIfTest /*:boolean*/ = y == null;
if (tmpIfTest) {
  const tmpClusterSSA_y /*:unknown*/ = foo;
  const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(tmpClusterSSA_y);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(y);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = a == null;
if (b) {
  const c = foo;
  const d = $( c );
  $( d );
}
else {
  const e = $( a );
  $( e );
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
