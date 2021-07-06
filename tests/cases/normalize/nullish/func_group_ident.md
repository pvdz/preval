# Preval test case

# func_group_ident.md

> Normalize > Nullish > Func group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
function f() {
  const a = {x: 1}
  const y = (1, a)??x
  return $(y);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const a = { x: 1 };
  const y = (1, a) ?? x;
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const a = { x: 1 };
  let y = a;
  const tmpIfTest = y == null;
  if (tmpIfTest) {
    y = x;
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
const a = { x: 1 };
const tmpIfTest = a == null;
if (tmpIfTest) {
  const tmpClusterSSA_tmpReturnArg = $(x);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpClusterSSA_tmpReturnArg$1 = $(a);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
