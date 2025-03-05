# Preval test case

# func_proto.md

> Tofix > func proto
>
> The function has its own prototype object, not to be confused
> with func.__proto__ which would point to Function.prototype

## Input

`````js filename=intro
$(function(){}.prototype);
`````

## Pre Normal


`````js filename=intro
$(
  function () {
    debugger;
  }.prototype,
);
`````

## Normalized


`````js filename=intro
const tmpCompObj = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam = tmpCompObj.prototype;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: BAD!!
 - 1: undefined
 - eval returned: undefined
