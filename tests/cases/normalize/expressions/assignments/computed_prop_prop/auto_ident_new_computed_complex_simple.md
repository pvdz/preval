# Preval test case

# auto_ident_new_computed_complex_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident new computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = new ($(b)["$"])(1))];
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = new ($(b)[`\$`])(1))];
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCompObj$1 = $(b);
const tmpNewCallee = tmpCompObj$1.$;
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
const tmpNewCallee = tmpCompObj$1.$;
const tmpClusterSSA_a = new tmpNewCallee(1);
obj[tmpClusterSSA_a];
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {};
const c = $( a );
const d = c.$;
const e = new d( 1 );
b[ e ];
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
