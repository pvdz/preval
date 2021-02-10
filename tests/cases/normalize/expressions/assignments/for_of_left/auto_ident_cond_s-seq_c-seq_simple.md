# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> normalize > expressions > assignments > for_of_left > auto_ident_cond_s-seq_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = (10, 20, 30) ? (40, 50, $(60)) : $($(100))).x of $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    let tmpAssignMemLhsObj;
    let tmpNestedComplexRhs = undefined;
    const tmpIfTest = 30;
    if (tmpIfTest) {
      tmpNestedComplexRhs = $(60);
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(100);
      tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
    }
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
