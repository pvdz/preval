# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Template > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(`before  ${(a = b = $(2))}  after`);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(`before  ` + String((a = b = $(2))) + `  after`);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpNestedComplexRhs = $(2);
const tmpBinBothRhs = String(tmpNestedComplexRhs);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 'before 2 after'
 - 3: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
