# Preval test case

# auto_ident_new_computed_complex_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident new computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[new ($(b)[$("$")])(1)];
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
obj[new ($(b)[$(`\$`)])(1)];
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
const tmpCompProp = new tmpNewCallee(1);
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const obj = {};
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`\$`);
const tmpNewCallee = tmpCompObj$1[tmpCompProp$1];
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
b: 1000
;
const c = {};
const d = $( a );
const e = $( "$" );
const f = d[ e ];
const g = new f( 1 );
c[ g ];
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
