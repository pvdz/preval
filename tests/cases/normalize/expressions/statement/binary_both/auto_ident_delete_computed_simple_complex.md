# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident delete computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete arg[$("y")] + delete arg[$("y")];
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
delete arg[$(`y`)] + delete arg[$(`y`)];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $(`y`);
const tmpBinBothLhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
const tmpDeleteCompObj$1 = arg;
const tmpDeleteCompProp$1 = $(`y`);
const tmpBinBothRhs = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
tmpBinBothLhs + tmpBinBothRhs;
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpDeleteCompProp = $(`y`);
delete arg[tmpDeleteCompProp];
const tmpDeleteCompProp$1 = $(`y`);
delete arg[tmpDeleteCompProp$1];
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = {
  a: 999,
  b: 1000,
};
const c = $( "y" );
delete a[ c ];
const d = $( "y" );
delete a[ d ];
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: 'y'
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
