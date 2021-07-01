# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Template > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${1 && $($(1))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + String(1 && $($(1))) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
let tmpCalleeParam$1 = 1;
if (tmpCalleeParam$1) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(1);
  tmpCalleeParam$1 = tmpCallCallee$3(tmpCalleeParam$3);
} else {
}
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
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$1 = $(tmpCalleeParam$3);
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
 - 2: 1
 - 3: 'before 1 after'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
