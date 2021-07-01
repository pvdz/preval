# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident cond s-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = (10, 20, 30) ? (40, 50, 60) : $($(100)))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + String((a = (10, 20, 30) ? (40, 50, 60) : $($(100)))) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
const tmpIfTest = 30;
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(100);
  a = tmpCallCallee$3(tmpCalleeParam$3);
}
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
$(`before  60  after`);
$(60);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before 60 after'
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
