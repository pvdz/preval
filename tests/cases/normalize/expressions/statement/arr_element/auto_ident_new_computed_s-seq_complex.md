# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident new computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new (1, 2, b)[$("$")](1) + new (1, 2, b)[$("$")](1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
new (1, 2, b)[$(`\$`)](1) + new (1, 2, b)[$(`\$`)](1);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
const tmpBinBothLhs = new tmpNewCallee(1);
const tmpCompObj$1 = b;
const tmpCompProp$1 = $(`\$`);
const tmpNewCallee$1 = tmpCompObj$1[tmpCompProp$1];
const tmpBinBothRhs = new tmpNewCallee$1(1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCompProp = $(`\$`);
const tmpNewCallee = b[tmpCompProp];
const tmpBinBothLhs = new tmpNewCallee(1);
const tmpCompProp$1 = $(`\$`);
const tmpNewCallee$1 = b[tmpCompProp$1];
const tmpBinBothRhs = new tmpNewCallee$1(1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {
a: 999,
b: 1000
;
const c = $( "$" );
const d = a[ c ];
const e = new d( 1 );
const f = $( "$" );
const g = a[ f ];
const h = new g( 1 );
e + h;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: '$'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
