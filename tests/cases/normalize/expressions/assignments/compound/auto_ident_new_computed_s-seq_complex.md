# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Compound > Auto ident new computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a *= new (1, 2, b)[$("$")](1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$((a *= new (1, 2, b)[$('$')](1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpCompObj = b;
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj[tmpCompProp];
const tmpBinBothRhs = new tmpNewCallee(1);
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCompProp = $('$');
const tmpNewCallee = b[tmpCompProp];
const tmpBinBothRhs = new tmpNewCallee(1);
const SSA_a = a * tmpBinBothRhs;
$(SSA_a);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: NaN
 - 4: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
