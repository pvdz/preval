# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident new computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
new (1, 2, $(b))[$("$")](1).a;
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
new (1, 2, $(b))[$(`\$`)](1).a;
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj$1 = $(b);
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj$1[tmpCompProp];
const tmpCompObj = new tmpNewCallee(1);
tmpCompObj.a;
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const tmpCompObj$1 = $(b);
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj$1[tmpCompProp];
const tmpCompObj = new tmpNewCallee(1);
tmpCompObj.a;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
const e = new d( 1 );
e.a;
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
