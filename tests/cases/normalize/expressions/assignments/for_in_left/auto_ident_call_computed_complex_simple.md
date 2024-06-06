# Preval test case

# auto_ident_call_computed_complex_simple.md

> Normalize > Expressions > Assignments > For in left > Auto ident call computed complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for ((a = $(b)["$"](1)).x in $({ x: 1 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
for ((a = $(b)[`\$`](1)).x in $({ x: 1 }));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpCallObj = $(b);
  a = tmpCallObj.$(1);
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpCallObj = $(b);
  a = tmpCallObj.$(1);
  a.x = tmpForInLhsNode;
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
let b = {
a: 999,
b: 1000
;
const c = { x: 1 };
const d = $( c );
let e = undefined;
for (e in d) {
  const f = $( a );
  b = f.$( 1 );
  b.x = e;
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { $: '"<$>"' }
 - 3: 1
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
