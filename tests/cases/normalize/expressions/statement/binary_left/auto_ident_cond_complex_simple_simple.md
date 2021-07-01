# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > Binary left > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($(1) ? 2 : $($(100))) + $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
($(1) ? 2 : $($(100))) + $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpBinBothLhs = 2;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpBinBothLhs = tmpCallCallee(tmpCalleeParam);
}
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
let tmpBinBothLhs = 0;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpBinBothLhs = 2;
} else {
  const tmpCalleeParam = $(100);
  tmpBinBothLhs = $(tmpCalleeParam);
}
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
