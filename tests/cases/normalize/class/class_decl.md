# Preval test case

# class_decl.md

> Normalize > Class > Class decl
>
> Class decls should become expressions

## Input

`````js filename=intro
class x {}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = class {};
$(x);
`````

## Normalized


`````js filename=intro
let x = class {};
$(x);
`````

## Output


`````js filename=intro
const x /*:class*/ = class {};
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = class   {

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
