# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > assignments > objlit_spread > auto_ident_logic_or_and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = $($(0)) || ($($(1)) && $($(2)))) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjSpread;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(0);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpNestedComplexRhs) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(1);
  tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
  if (tmpNestedComplexRhs) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
  }
}
a = tmpNestedComplexRhs;
tmpObjSpread = tmpNestedComplexRhs;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: {}
 - 8: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
