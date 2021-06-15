# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Template > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = "foo")}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + (a = `foo`) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
a = `foo`;
let tmpBinBothRhs = a;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
$(`before  foo  after`);
$(`foo`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before foo after'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
