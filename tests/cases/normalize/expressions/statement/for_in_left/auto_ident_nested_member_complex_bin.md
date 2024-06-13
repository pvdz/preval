# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Statement > For in left > Auto ident nested member complex bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
for (($(b)[$("x")] = $(c)[$("y")] = d + e).x in $({ x: 1 }));
$(a, b, c, d, e);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;
let a = { a: 999, b: 1000 };
for (($(b)[$(`x`)] = $(c)[$(`y`)] = d + e).x in $({ x: 1 }));
$(a, b, c, d, e);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedObj$1 = $(c);
  const varInitAssignLhsComputedProp$1 = $(`y`);
  const varInitAssignLhsComputedRhs$1 = d + e;
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpAssignMemLhsObj = varInitAssignLhsComputedRhs;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, b, c, d, e);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedObj$1 = $(c);
  const varInitAssignLhsComputedProp$1 = $(`y`);
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 7;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
  (7).x = tmpForInLhsNode;
}
$(a, b, c, 3, 4);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = { y: 2 };
const c = {
  a: 999,
  b: 1000,
};
const d = { x: 1 };
const e = $( d );
let f = undefined;
for (f in e) {
  const g = $( a );
  const h = $( "x" );
  const i = $( b );
  const j = $( "y" );
  i[j] = 7;
  g[h] = 7;
  7.x = f;
}
$( c, a, b, 3, 4 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - eval returned: ("<crash[ Cannot create property 'x' on number '7' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
