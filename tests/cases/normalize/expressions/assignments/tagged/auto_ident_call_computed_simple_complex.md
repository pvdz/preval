# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident call computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${(a = b[$("$")](1))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = b[$(`\$`)](1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpCallCompObj = b;
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
const tmpCallCompProp = $(`\$`);
const a = b[tmpCallCompProp](1);
$(tmpCalleeParam, a);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = [ "before ", " after" ];
const c = $( "$" );
const d = a[ c ]( 1 )};
$( b, d );
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: ['before ', ' after'], 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
