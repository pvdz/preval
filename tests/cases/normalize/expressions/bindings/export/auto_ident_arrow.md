# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Bindings > Export > Auto ident arrow
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = () => {};
$(a);
`````

## Pre Normal


`````js filename=intro
let a = () => {
  debugger;
};
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let a = function () {
  debugger;
  return undefined;
};
export { a };
$(a);
`````

## Output


`````js filename=intro
const a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
export { a as a };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
