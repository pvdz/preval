# Preval test case

# ident_simple.md

> Normalize > Binding > Export-default > Ident simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = 2, c = 3;
export let a = b;
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = 2,
  c = 3;
let a = b;
export { a };
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 2;
let c = 3;
let a = b;
export { a };
$(a, b, c);
`````

## Output


`````js filename=intro
const a /*:number*/ = 2;
export { a };
$(2, 2, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 2;
export { a as a };
$( 2, 2, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
