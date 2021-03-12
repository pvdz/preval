# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Statement > For in left > Auto ident prop s-seq assign simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (((1, 2, b).c = 2).x in $({ x: 1 }));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
for (((1, 2, b).c = 2).x in $({ x: 1 }));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  const varInitAssignLhsComputedObj = b;
  const varInitAssignLhsComputedRhs = 2;
  varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
  const tmpAssignMemLhsObj = varInitAssignLhsComputedRhs;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  b.c = 2;
  (2).x = tmpForInLhsNode;
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ("<crash[ Cannot create property 'x' on number '2' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
