# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Statement > If > Auto ident delete computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
if (delete arg[$("y")]);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
if (delete arg[$(`y`)]);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $(`y`);
const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpDeleteCompProp = $(`y`);
delete arg[tmpDeleteCompProp];
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = {
a: 999,
b: 1000
;
const c = $( "y" );
deletea[ c ];
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
