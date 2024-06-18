# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident obj pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$(
  (a = { x, y } = ($(x), $(y), { x: $(3), y: $(4) })) &&
    (a = { x, y } = ($(x), $(y), { x: $(3), y: $(4) }))
);
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
$((a = { x: x, y: y } = ($(x), $(y), { x: $(3), y: $(4) })) && (a = { x: x, y: y } = ($(x), $(y), { x: $(3), y: $(4) })));
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(x);
$(y);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
a = tmpNestedAssignObjPatternRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  $(x);
  $(y);
  const tmpObjLitVal$3 = $(3);
  const tmpObjLitVal$5 = $(4);
  const tmpNestedAssignObjPatternRhs$1 = { x: tmpObjLitVal$3, y: tmpObjLitVal$5 };
  x = tmpNestedAssignObjPatternRhs$1.x;
  y = tmpNestedAssignObjPatternRhs$1.y;
  tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, x, y);
`````

## Output


`````js filename=intro
$(1);
$(2);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
$(tmpObjLitVal);
$(tmpObjLitVal$1);
const tmpObjLitVal$3 = $(3);
const tmpObjLitVal$5 = $(4);
const tmpNestedAssignObjPatternRhs$1 = { x: tmpObjLitVal$3, y: tmpObjLitVal$5 };
$(tmpNestedAssignObjPatternRhs$1);
$(tmpNestedAssignObjPatternRhs$1, tmpObjLitVal$3, tmpObjLitVal$5);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
$( a );
$( b );
const c = $( 3 );
const d = $( 4 );
const e = {
  x: c,
  y: d,
};
$( e );
$( e, c, d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 3
 - 6: 4
 - 7: 3
 - 8: 4
 - 9: { x: '3', y: '4' }
 - 10: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
