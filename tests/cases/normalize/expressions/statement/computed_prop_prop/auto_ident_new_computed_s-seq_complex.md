# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident new computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[new (1, 2, b)[$("$")](1)];
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
obj[new (1, 2, b)[$(`\$`)](1)];
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCompObj$1 = b;
const tmpCompProp$1 = $(`\$`);
const tmpNewCallee = tmpCompObj$1[tmpCompProp$1];
const tmpCompProp = new tmpNewCallee(1);
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const obj = {};
const tmpCompProp$1 = $(`\$`);
const tmpNewCallee = b[tmpCompProp$1];
const tmpCompProp = new tmpNewCallee(1);
obj[tmpCompProp];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {
  a: 999,
  b: 1000,
};
const c = {};
const d = $( "$" );
const e = a[ d ];
const f = new e( 1 );
c[ f ];
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
