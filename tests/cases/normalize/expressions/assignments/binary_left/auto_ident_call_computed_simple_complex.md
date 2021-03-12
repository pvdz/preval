# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Assignments > Binary left > Auto ident call computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = b[$("$")](1)) + $(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$((a = b[$('$')](1)) + $(100));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCompObj = b;
const tmpCallCompProp = $('$');
a = tmpCallCompObj[tmpCallCompProp](1);
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCallCompProp = $('$');
const SSA_a = b[tmpCallCompProp](1);
const tmpBinBothRhs = $(100);
const tmpCalleeParam = SSA_a + tmpBinBothRhs;
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 100
 - 4: 101
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
