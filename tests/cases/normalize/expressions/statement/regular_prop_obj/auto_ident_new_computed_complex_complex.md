# Preval test case

# auto_ident_new_computed_complex_complex.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident new computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
new ($(b)[$("$")])(1).a;
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
new ($(b)[$(`\$`)])(1).a;
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
const a = { a: 999, b: 1000 };
const tmpCompObj$1 = $(b);
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj$1[tmpCompProp];
const tmpCompObj = new tmpNewCallee(1);
tmpCompObj.a;
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
const c = $( a );
const d = $( "$" );
const e = c[ d ];
const f = new e( 1 );
f.a;
$( b );
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
