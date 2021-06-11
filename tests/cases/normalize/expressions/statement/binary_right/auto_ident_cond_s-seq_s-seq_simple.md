# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Statement > Binary right > Auto ident cond s-seq s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + ((10, 20, 30) ? (40, 50, 60) : $($(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + ((10, 20, 30) ? (40, 50, 60) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
let tmpBinBothRhs = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  tmpBinBothRhs = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpBinBothRhs = tmpCallCallee(tmpCalleeParam);
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(100);
tmpBinBothLhs + 60;
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
