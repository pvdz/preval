# Preval test case

# ident_new_computed_complex_complex1.md

> Normalize > Expressions > Statement > For in left > Ident new computed complex complex1
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (new ($(1)[2])(3).x in b);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
for (new ($(1)[2])(3).x in b);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpForInLhsNode = undefined;
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
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in b) {
  const tmpCompObj = $(1);
  const tmpNewCallee = tmpCompObj[2];
  const tmpAssignMemLhsObj = new tmpNewCallee(3);
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {
  a: 999,
  b: 1000,
};
let c = undefined;
for (c in a) {
  const d = $( 1 );
  const e = d[ 2 ];
  const f = new e( 3 );
  f.x = c;
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not a constructor ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
