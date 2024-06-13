# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > For in left > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ([$(1), 2, $(3)].x in $({ x: 1 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for ([$(1), 2, $(3)].x in $({ x: 1 }));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpArrElement = $(1);
  const tmpArrElement$1 = 2;
  const tmpArrElement$3 = $(3);
  const tmpAssignMemLhsObj = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpArrElement = $(1);
  const tmpArrElement$3 = $(3);
  const tmpAssignMemLhsObj = [tmpArrElement, 2, tmpArrElement$3];
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = { x: 1 };
const c = $( b );
let d = undefined;
for (d in c) {
  const e = $( 1 );
  const f = $( 3 );
  const g = [ e, 2, f ];
  g.x = d;
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 3
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
