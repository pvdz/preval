# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Binary left > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 && $($(1))) + $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 && $($(1))) + $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = 1;
if (tmpBinBothLhs) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpBinBothLhs = tmpCallCallee(tmpCalleeParam);
} else {
}
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpBinBothLhs = 1;
if (tmpBinBothLhs) {
  const tmpCalleeParam = $(1);
  tmpBinBothLhs = $(tmpCalleeParam);
} else {
}
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 100
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
