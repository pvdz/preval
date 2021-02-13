# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > assignments > for_in_left > auto_ident_delete_prop_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for ((a = delete ($(1), $(2), $(arg)).y).x in $({ x: 1 }));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    $(1);
    $(2);
    const tmpDeleteObj = $(arg);
    a = delete tmpDeleteObj.y;
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    $(1);
    $(2);
    const tmpDeleteObj = $(arg);
    a = delete tmpDeleteObj.y;
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
