# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident arrow
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let a = () => {};
$(a);
`````

## Pre Normal


`````js filename=intro
let a = () => {
  debugger;
};
$(a);
`````

## Normalized


`````js filename=intro
let a = function () {
  debugger;
  return undefined;
};
$(a);
`````

## Output


`````js filename=intro
const a /*:()=>*/ = function () {
  debugger;
  return undefined;
};
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
