# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident delete computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[delete $(arg)[$("y")]];
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
obj[delete $(arg)[$(`y`)]];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
const tmpCompProp = delete tmpDeleteCompObj[tmpDeleteCompProp];
tmpCompObj[tmpCompProp];
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const obj = {};
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
const tmpCompProp = delete tmpDeleteCompObj[tmpDeleteCompProp];
obj[tmpCompProp];
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
const c = {};
const d = $( a );
const e = $( "y" );
const f = delete d[ e ];
c[ f ];
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
