# Preval test case

# method_call.md

> Object literal > Static prop lookups > Method call
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {x: function(){ return $(1); }};
$(o.x());
`````

## Pre Normal


`````js filename=intro
const o = {
  x: function () {
    debugger;
    return $(1);
  },
};
$(o.x());
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = function () {
  debugger;
  const tmpReturnArg = $(1);
  return tmpReturnArg;
};
const o = { x: tmpObjLitVal };
const tmpCallCallee = $;
const tmpCalleeParam = o.x();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
$(tmpCalleeParam);
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
