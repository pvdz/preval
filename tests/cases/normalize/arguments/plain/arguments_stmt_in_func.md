# Preval test case

# arguments_stmt_in_func.md

> Normalize > Arguments > Plain > Arguments stmt in func
>
> Arguments is a special global

## Input

`````js filename=intro
function f() {
  arguments;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  null;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam = f();
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
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
