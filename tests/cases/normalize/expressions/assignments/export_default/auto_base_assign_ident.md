# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Export default > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default a = b = $(2);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = b = $(2));
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Output


`````js filename=intro
const tmpNestedComplexRhs = $(2);
const tmpAnonDefaultExport = tmpNestedComplexRhs;
export { tmpAnonDefaultExport as default };
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = a;
export { b as default };
$( a, a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
