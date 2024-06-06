# Preval test case

# literal.md

> Normalize > Member access > Statement > Func > Literal
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
function f() {
  'foo'.length;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  `foo`.length;
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
