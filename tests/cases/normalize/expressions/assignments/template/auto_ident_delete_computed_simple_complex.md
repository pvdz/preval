# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > Template > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${(a = delete arg[$("y")])}  after`);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(`before  ` + String((a = delete arg[$(`y`)])) + `  after`);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $(`y`);
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteCompProp = $(`y`);
const a = delete arg[tmpDeleteCompProp];
const tmpBinBothRhs = String(a);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: 'before true after'
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
