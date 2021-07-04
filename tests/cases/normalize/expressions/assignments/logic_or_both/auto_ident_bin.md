# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) + $(2)) || (a = $(1) + $(2)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) + $(2)) || (a = $(1) + $(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
a = tmpBinBothLhs + tmpBinBothRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpBinBothLhs$1 = $(1);
  const tmpBinBothRhs$1 = $(2);
  const tmpNestedComplexRhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
let a = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = a;
if (a) {
  $(tmpCalleeParam);
} else {
  const tmpBinBothLhs$1 = $(1);
  const tmpBinBothRhs$1 = $(2);
  const tmpNestedComplexRhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
