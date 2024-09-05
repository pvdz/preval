# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Statement > Return > Auto ident obj pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
function f() {
  return ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) }));
}
$(f());
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return ({ x: x, y: y } = ($(x), $(y), { x: $(3), y: $(4) }));
};
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
$(f());
$(a, x, y);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let tmpReturnArg = undefined;
  $(x);
  $(y);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  tmpReturnArg = tmpNestedAssignObjPatternRhs;
  return tmpReturnArg;
};
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, x, y);
`````

## Output


`````js filename=intro
$(1);
$(2);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
$(tmpNestedAssignObjPatternRhs);
const a = { a: 999, b: 1000 };
$(a, tmpObjLitVal, tmpObjLitVal$1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
const c = {
  x: a,
  y: b,
};
$( c );
const d = {
  a: 999,
  b: 1000,
};
$( d, a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: { x: '3', y: '4' }
 - 6: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
