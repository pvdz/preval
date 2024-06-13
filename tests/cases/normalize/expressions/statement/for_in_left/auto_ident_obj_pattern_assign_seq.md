# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Statement > For in left > Auto ident obj pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (({ x, y } = ($(x), $(y), { x: $(3), y: $(4) })).x in $({ x: 1 }));
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
for (({ x: x, y: y } = ($(x), $(y), { x: $(3), y: $(4) })).x in $({ x: 1 }));
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  let tmpAssignMemLhsObj = undefined;
  $(x);
  $(y);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  tmpAssignMemLhsObj = tmpNestedAssignObjPatternRhs;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, x, y);
`````

## Output


`````js filename=intro
let x = 1;
let y = 2;
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  $(x);
  $(y);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  x = tmpObjLitVal;
  y = tmpObjLitVal$1;
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  tmpNestedAssignObjPatternRhs.x = tmpForInLhsNode;
}
$(a, x, y);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
let b = 2;
const c = {
  a: 999,
  b: 1000,
};
const d = { x: 1 };
const e = $( d );
let f = undefined;
for (f in e) {
  $( a );
  $( b );
  const g = $( 3 );
  const h = $( 4 );
  a = g;
  b = h;
  const i = {
    x: g,
    y: h,
  };
  i.x = f;
}
$( c, a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
