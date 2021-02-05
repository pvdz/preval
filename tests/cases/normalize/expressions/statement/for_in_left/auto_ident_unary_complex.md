# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > statement > for_in_left > auto_ident_unary_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for ((typeof $(x)).x in $({ x: 1 }));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    const tmpUnaryArg = $(x);
    const tmpAssignMemLhsObj = typeof tmpUnaryArg;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpUnaryArg = $(1);
  const tmpAssignMemLhsObj = typeof tmpUnaryArg;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
