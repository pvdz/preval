# Preval test case

# ident_sequence_complex.md

> Normalize > Binding > Export-default > Ident sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = 2, c = 3;
export let a = ($(b), $(c));
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = 2,
  c = 3;
let a = ($(b), $(c));
export { a };
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 2;
let c = 3;
$(b);
let a = $(c);
export { a };
$(a, b, c);
`````

## Output


`````js filename=intro
$(2);
const a /*:unknown*/ = $(3);
export { a };
$(a, 2, 3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
const a = $( 3 );
export { a as a };
$( a, 2, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
