# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$(1) + $(2)];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$(1) + $(2)];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpCompProp = tmpBinBothLhs + tmpBinBothRhs;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const obj = {};
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpCompProp = tmpBinBothLhs + tmpBinBothRhs;
obj[tmpCompProp];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = {};
const c = $( 1 );
const d = $( 2 );
const e = c + d;
b[ e ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
