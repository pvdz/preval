# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident obj pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$($(100) && (a = { x, y } = ($(x), $(y), { x: $(3), y: $(4) })));
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
$($(100) && (a = { x: x, y: y } = ($(x), $(y), { x: $(3), y: $(4) })));
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  $(x);
  $(y);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, x, y);
`````

## Output


`````js filename=intro
let x /*:unknown*/ = 1;
let y /*:unknown*/ = 2;
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(1);
  $(2);
  const tmpObjLitVal /*:unknown*/ = $(3);
  const tmpObjLitVal$1 /*:unknown*/ = $(4);
  x = tmpObjLitVal;
  y = tmpObjLitVal$1;
  const tmpNestedAssignObjPatternRhs /*:object*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  a = tmpNestedAssignObjPatternRhs;
  $(tmpNestedAssignObjPatternRhs);
} else {
  $(tmpCalleeParam);
}
$(a, x, y);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
let b = 2;
let c = {
  a: 999,
  b: 1000,
};
const d = $( 100 );
if (d) {
  $( 1 );
  $( 2 );
  const e = $( 3 );
  const f = $( 4 );
  a = e;
  b = f;
  const g = {
    x: e,
    y: f,
  };
  c = g;
  $( g );
}
else {
  $( d );
}
$( c, a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: { x: '3', y: '4' }
 - 7: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
