# Preval test case

# auto_ident_bin.md

> normalize > expressions > assignments > for_of_right > auto_ident_bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = $(1) + $(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs;
  const tmpBinBothLhs = $(1);
  const tmpBinBothRhs = $(2);
  const tmpNestedComplexRhs = tmpBinBothLhs + tmpBinBothRhs;
  a = tmpNestedComplexRhs;
  tmpForOfDeclRhs = tmpNestedComplexRhs;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpForOfDeclRhs;
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpNestedComplexRhs = tmpBinBothLhs + tmpBinBothRhs;
a = tmpNestedComplexRhs;
tmpForOfDeclRhs = tmpNestedComplexRhs;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
