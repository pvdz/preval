# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident new computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = new (1, 2, $(b))[$("$")](1))];
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = new (1, 2, $(b))[$(`\$`)](1))];
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`\$`);
const tmpNewCallee = tmpCompObj$1[tmpCompProp$1];
a = new tmpNewCallee(1);
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const obj = {};
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`\$`);
const tmpNewCallee = tmpCompObj$1[tmpCompProp$1];
const tmpSSA_a = new tmpNewCallee(1);
obj[tmpSSA_a];
$(tmpSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {};
const c = $( a );
const d = $( "$" );
const e = c[ d ];
const f = new e( 1 );
b[ f ];
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
