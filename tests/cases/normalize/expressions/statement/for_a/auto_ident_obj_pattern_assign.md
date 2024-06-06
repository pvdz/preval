# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Statement > For a > Auto ident obj pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for ({ x, y } = { x: $(3), y: $(4) }; $(0); );
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  ({ x: x, y: y } = { x: $(3), y: $(4) });
  while ($(0)) {}
}
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpAssignObjPatternRhs.x;
y = tmpAssignObjPatternRhs.y;
let tmpIfTest = $(0);
while (true) {
  if (tmpIfTest) {
    tmpIfTest = $(0);
  } else {
    break;
  }
}
$(a, x, y);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpIfTest = $(0);
if (tmpIfTest) {
  let tmpClusterSSA_tmpIfTest = $(0);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      tmpClusterSSA_tmpIfTest = $(0);
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a, tmpObjLitVal, tmpObjLitVal$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
const c = $( 0 );
if (c) {
  let d = $( 0 );
  while ($LOOP_UNROLL_10) {
    if (d) {
      d = $( 0 );
    }
    else {
      break;
    }
  }
}
const e = {
a: 999,
b: 1000
;
$( e, a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: 0
 - 4: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
