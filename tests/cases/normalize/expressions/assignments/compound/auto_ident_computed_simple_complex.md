# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Assignments > Compound > Auto ident computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a *= b[$("c")]));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$((a *= b[$(`c`)]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpCompObj = b;
const tmpCompProp = $(`c`);
const tmpBinBothRhs = tmpCompObj[tmpCompProp];
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpCompProp = $(`c`);
const b = { c: 1 };
const tmpBinBothRhs = b[tmpCompProp];
a = tmpBinBothLhs * tmpBinBothRhs;
$(a);
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
const b = a;
const c = $( "c" );
const d = { c: 1 };
const e = d[ c ];
a = b * e;
$( a );
$( a, d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: NaN
 - 3: NaN, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
