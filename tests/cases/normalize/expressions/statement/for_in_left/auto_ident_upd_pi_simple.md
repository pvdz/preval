# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Statement > For in left > Auto ident upd pi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for ((++b).x in $({ x: 1 }));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
for ((++b).x in $({ x: 1 }));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  b = b + 1;
  let tmpAssignMemLhsObj = b;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  b = b + 1;
  const tmpAssignMemLhsObj = b;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
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
