# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident call computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = b[$("$")](1))];
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = b[$(`\$`)](1))];
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCallCompObj = b;
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
const tmpCallCompProp = $(`\$`);
const a = b[tmpCallCompProp](1);
obj[a];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {};
const c = $( "$" );
const d = a[ c ]( 1 )};
b[ d ];
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
