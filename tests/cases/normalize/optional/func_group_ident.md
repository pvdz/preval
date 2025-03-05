# Preval test case

# func_group_ident.md

> Normalize > Optional > Func group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
function f() {
  const a = {x: 1}
  const y = (1, a)?.x
  return $(y);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const a = { x: 1 };
  const y = (1, a)?.x;
  return $(y);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const a = { x: 1 };
  let y = undefined;
  const tmpChainRootProp = a;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.x;
    y = tmpChainElementObject;
  } else {
  }
  const tmpReturnArg = $(y);
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(1);
$(tmpClusterSSA_tmpReturnArg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
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
