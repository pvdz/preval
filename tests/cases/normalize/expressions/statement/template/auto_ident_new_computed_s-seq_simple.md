# Preval test case

# auto_ident_new_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Template > Auto ident new computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(`before  ${new (1, 2, b)["$"](1)}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(`before  ` + String(new (1, 2, b)[`\$`](1)) + `  after`);
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
const tmpNewCallee = tmpCompObj.$;
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
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = new $(1);
const tmpBinBothRhs = String(tmpCalleeParam$1);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'before [object Object] after'
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
