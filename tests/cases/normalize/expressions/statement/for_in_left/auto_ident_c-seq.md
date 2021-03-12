# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Statement > For in left > Auto ident c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (($(1), $(2), $(x)).x in $({ x: 1 }));
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
for (($(1), $(2), $(x)).x in $({ x: 1 }));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  $(1);
  $(2);
  const tmpAssignMemLhsObj = $(x);
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, x);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  $(1);
  $(2);
  const tmpAssignMemLhsObj = $(1);
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 2
 - 4: 1
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
