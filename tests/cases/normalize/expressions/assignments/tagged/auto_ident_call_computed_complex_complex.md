# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident call computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${(a = $(b)[$("$")](1))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = $(b)[$(`\$`)](1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
a = tmpCallCompObj[tmpCallCompProp](1);
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCalleeParam = [`before `, ` after`];
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
const tmpSSA_a = tmpCallCompObj[tmpCallCompProp](1);
$(tmpCalleeParam, tmpSSA_a);
$(tmpSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = [ "before ", " after" ];
const c = $( a );
const d = $( "$" );
const e = c[ d ]( 1 )};
$( b, e );
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: ['before ', ' after'], 1
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
