# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> normalize > expressions > assignments > for_in_left > auto_ident_cond_c-seq_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = (10, 20, $(30)) ? $(2) : $($(100))).x in $({ x: 1 }));
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
    const tmpIfTest = $(30);
    if (tmpIfTest) {
      a = $(2);
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(100);
      a = tmpCallCallee$1(tmpCalleeParam$1);
    }
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    const tmpIfTest = $(30);
    if (tmpIfTest) {
      a = $(2);
    } else {
      const tmpCalleeParam$1 = $(100);
      a = $(tmpCalleeParam$1);
    }
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 30
 - 3: 2
 - 4: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same