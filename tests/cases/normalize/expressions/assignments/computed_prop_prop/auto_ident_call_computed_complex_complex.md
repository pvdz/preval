# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident call computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $(b)[$("$")](1))];
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $(b)[$(`\$`)](1))];
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
a = tmpCallCompObj[tmpCallCompProp](1);
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const obj = {};
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
const tmpClusterSSA_a = tmpCallCompObj[tmpCallCompProp](1);
obj[tmpClusterSSA_a];
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {};
const c = $( a );
const d = $( "$" );
const e = c[ d ]( 1 );
b[ e ];
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
