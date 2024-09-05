# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[b[$("c")]];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
obj[b[$(`c`)]];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCompObj$1 = b;
const tmpCompProp$1 = $(`c`);
const tmpCompProp = tmpCompObj$1[tmpCompProp$1];
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output


`````js filename=intro
const tmpCompProp$1 = $(`c`);
const b = { c: 1 };
const tmpCompProp = b[tmpCompProp$1];
const obj = {};
obj[tmpCompProp];
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
const d = {};
d[ c ];
const e = {
  a: 999,
  b: 1000,
};
$( e, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
