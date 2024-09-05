# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
b[$("c")] + b[$("c")];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
b[$(`c`)] + b[$(`c`)];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCompProp = $(`c`);
const tmpBinBothLhs = tmpCompObj[tmpCompProp];
const tmpCompObj$1 = b;
const tmpCompProp$1 = $(`c`);
const tmpBinBothRhs = tmpCompObj$1[tmpCompProp$1];
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Output


`````js filename=intro
const tmpCompProp = $(`c`);
const b = { c: 1 };
const tmpBinBothLhs = b[tmpCompProp];
const tmpCompProp$1 = $(`c`);
const tmpBinBothRhs = b[tmpCompProp$1];
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
const d = $( "c" );
const e = b[ d ];
c + e;
const f = {
  a: 999,
  b: 1000,
};
$( f, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 'c'
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
