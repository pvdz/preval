# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident new computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${(a = new b[$("$")](1))} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = new b[$(`\$`)](1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpCompObj = b;
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
a = new tmpNewCallee(1);
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const tmpCalleeParam = [`before `, ` after`];
const tmpCompProp = $(`\$`);
const tmpNewCallee = b[tmpCompProp];
const tmpClusterSSA_a = new tmpNewCallee(1);
$(tmpCalleeParam, tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = [ "before ", " after" ];
const c = $( "$" );
const d = a[ c ];
const e = new d( 1 );
$( b, e );
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: ['before ', ' after'], {}
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
