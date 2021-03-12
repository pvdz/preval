# Preval test case

# ident_new_computed_complex_complex1.md

> Normalize > Expressions > Statement > For in left > Ident new computed complex complex1
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (new ($(1)[2])(3).x in b);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpForInLhsNode;
for (tmpForInLhsNode in b) {
  const tmpCompObj = $(1);
  const tmpNewCallee = tmpCompObj[2];
  const tmpAssignMemLhsObj = new tmpNewCallee(3);
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
let tmpForInLhsNode;
for (tmpForInLhsNode in b) {
  const tmpCompObj = $(1);
  const tmpNewCallee = tmpCompObj[2];
  const tmpAssignMemLhsObj = new tmpNewCallee(3);
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not a constructor ]>')

Normalized calls: Same

Final output calls: Same
