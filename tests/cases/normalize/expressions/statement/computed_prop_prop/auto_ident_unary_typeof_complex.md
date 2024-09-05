# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident unary typeof complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[typeof $(arg)];
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
obj[typeof $(arg)];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpUnaryArg = $(arg);
const tmpCompProp = typeof tmpUnaryArg;
tmpCompObj[tmpCompProp];
$(a, arg);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(1);
const obj = {};
const tmpCompProp = typeof tmpUnaryArg;
obj[tmpCompProp];
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = {};
const c = typeof a;
b[ c ];
const d = {
  a: 999,
  b: 1000,
};
$( d, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
