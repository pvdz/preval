# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Statement > Template > Auto ident object simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${{ x: 1, y: 2, z: 3 }}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + String({ x: 1, y: 2, z: 3 }) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
const tmpCalleeParam$1 = { x: 1, y: 2, z: 3 };
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
const tmpCalleeParam$1 = { x: 1, y: 2, z: 3 };
const tmpBinBothRhs = String(tmpCalleeParam$1);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before [object Object] after'
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
