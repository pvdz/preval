# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Statement > For in left > Auto ident delete computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for ((delete $(arg)[$("y")]).x in $({ x: 1 }));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $('y');
  const tmpAssignMemLhsObj = delete tmpDeleteCompObj[tmpDeleteCompProp];
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $('y');
  const tmpAssignMemLhsObj = delete tmpDeleteCompObj[tmpDeleteCompProp];
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { y: '1' }
 - 3: 'y'
 - eval returned: ("<crash[ Cannot create property 'x' on boolean 'true' ]>")

Normalized calls: Same

Final output calls: Same
