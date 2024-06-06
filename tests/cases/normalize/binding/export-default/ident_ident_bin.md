# Preval test case

# ident_ident_bin.md

> Normalize > Binding > Export-default > Ident ident bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = 2, c = 3, d = 4;
export let a = b = c + d;
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = 2,
  c = 3,
  d = 4;
let a = (b = c + d);
export { a };
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 2;
let c = 3;
let d = 4;
b = c + d;
let a = b;
export { a };
$(a, b, c);
`````

## Output


`````js filename=intro
const a = 7;
export { a };
$(7, 7, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 7;
export { a as a from "undefined"
$( 7, 7, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
