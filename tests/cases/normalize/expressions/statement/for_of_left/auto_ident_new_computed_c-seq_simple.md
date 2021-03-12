# Preval test case

# auto_ident_new_computed_c-seq_simple.md

> Normalize > Expressions > Statement > For of left > Auto ident new computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (new (1, 2, $(b))["$"](1).x of $({ x: 1 }));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
for (new (1, 2, $(b))['$'](1).x of $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  const tmpAssignMemLhsObj = new tmpNewCallee(1);
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  const tmpAssignMemLhsObj = new tmpNewCallee(1);
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
