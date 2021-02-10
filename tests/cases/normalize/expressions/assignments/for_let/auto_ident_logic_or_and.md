# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > assignments > for_let > auto_ident_logic_or_and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = $($(0)) || ($($(1)) && $($(2)))); ; $(1)) $(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpNestedComplexRhs) {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(2);
      tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
    }
  }
  a = tmpNestedComplexRhs;
  xyz = tmpNestedComplexRhs;
  while (true) {
    $(xyz);
    $(1);
  }
}
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
 - 7: 2
 - 8: 1
 - 9: 2
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: 2
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 2
 - 18: 1
 - 19: 2
 - 20: 1
 - 21: 2
 - 22: 1
 - 23: 2
 - 24: 1
 - 25: 2
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
