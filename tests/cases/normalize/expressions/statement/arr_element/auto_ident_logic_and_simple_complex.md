# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 && $($(1))) + (1 && $($(1)));
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
}
let tmpBinBothRhs = 1;
if (tmpBinBothRhs) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
}
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
}
let tmpBinBothRhs = 1;
if (tmpBinBothRhs) {
  const tmpCalleeParam$1 = $(1);
  tmpBinBothRhs = $(tmpCalleeParam$1);
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
