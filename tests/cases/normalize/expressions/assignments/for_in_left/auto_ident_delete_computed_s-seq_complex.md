# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > For in left > Auto ident delete computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for ((a = delete ($(1), $(2), arg)[$("y")]).x in $({ x: 1 }));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
for ((a = delete ($(1), $(2), arg)[$(`y`)]).x in $({ x: 1 }));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  $(1);
  $(2);
  const tmpDeleteCompObj = arg;
  const tmpDeleteCompProp = $(`y`);
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  $(1);
  $(2);
  const tmpDeleteCompProp = $(`y`);
  a = delete arg[tmpDeleteCompProp];
  a.x = tmpForInLhsNode;
}
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 2
 - 4: 'y'
 - eval returned: ("<crash[ Cannot create property 'x' on boolean 'true' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
