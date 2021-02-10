# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> normalize > expressions > assignments > for_in_left > auto_ident_cond_complex_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = $(1) ? (40, 50, $(60)) : $($(100))).x in $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    let tmpAssignMemLhsObj;
    let tmpNestedComplexRhs = undefined;
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      tmpNestedComplexRhs = $(60);
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(100);
      tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
    }
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
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
 - 1: { x: '1' }
 - 2: 1
 - 3: 60
 - 4: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
