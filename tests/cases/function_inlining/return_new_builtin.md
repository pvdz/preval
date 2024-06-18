# Preval test case

# return_new_builtin.md

> Function inlining > Return new builtin
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function f() {
  return new $(10);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return new $(10);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = new $(10);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpReturnArg = new $(10);
$(tmpReturnArg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = new $( 10 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
