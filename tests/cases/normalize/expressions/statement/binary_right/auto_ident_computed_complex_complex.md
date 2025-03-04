# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Statement > Binary right > Auto ident computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(100) + $(b)[$("c")];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(100) + $(b)[$(`c`)];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
const tmpBinBothRhs = tmpCompObj[tmpCompProp];
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Output


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const b /*:object*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`c`);
const tmpBinBothRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = { c: 1 };
const c = $( b );
const d = $( "c" );
const e = c[ d ];
a + e;
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
 - 1: 100
 - 2: { c: '1' }
 - 3: 'c'
 - 4: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
