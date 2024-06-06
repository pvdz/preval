# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident call computed c-seq complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = (1, 2, $(b))[$("$")](1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = (1, 2, $(b))[$(`\$`)](1);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
let a = tmpCallCompObj[tmpCallCompProp](1);
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
const a = tmpCallCompObj[tmpCallCompProp](1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ]( 1 )};
$( d );
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
