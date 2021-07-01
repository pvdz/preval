# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Statement > Template > Auto ident new computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(`before  ${new b[$("$")](1)}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(`before  ` + String(new b[$(`\$`)](1)) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
const tmpCompObj = b;
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
const tmpCalleeParam$1 = new tmpNewCallee(1);
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCompProp = $(`\$`);
const tmpNewCallee = b[tmpCompProp];
const tmpCalleeParam$1 = new tmpNewCallee(1);
const tmpBinBothRhs = String(tmpCalleeParam$1);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 'before [object Object] after'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
