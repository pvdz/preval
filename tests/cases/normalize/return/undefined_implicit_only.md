# Preval test case

# undefined_implicit_only.md

> Normalize > Return > Undefined implicit only
>
> Implicitly returning undefined as the last statement is not necessary

## Input

`````js filename=intro
function f() {
  return;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
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
