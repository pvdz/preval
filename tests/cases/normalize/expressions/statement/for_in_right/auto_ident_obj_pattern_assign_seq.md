# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Statement > For in right > Auto ident obj pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let x in ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) })));
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  let tmpForInGen = $forIn(({ x: x$1, y: y } = ($(x$1), $(y), { x: $(3), y: $(4) })));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      let x$1 = tmpForInNext.value;
    }
  }
}
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $forIn;
let tmpCalleeParam = undefined;
$(x$1);
$(y);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x$1 = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
tmpCalleeParam = tmpNestedAssignObjPatternRhs;
let tmpForInGen = tmpCallCallee(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let x$2 = tmpForInNext.value;
  }
}
$(a, x, y);
`````

## Output


`````js filename=intro
$(x$1);
$(2);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
x$1 = tmpObjLitVal;
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
const tmpForInGen = $forIn(tmpNestedAssignObjPatternRhs);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForInNext.value;
  }
}
const a = { a: 999, b: 1000 };
$(a, 1, tmpObjLitVal$1);
`````

## PST Output

With rename=true

`````js filename=intro
$( x$1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
x$1 = a;
const c = {
  x: a,
  y: b,
};
const d = $forIn( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    e.value;
  }
}
const g = {
  a: 999,
  b: 1000,
};
$( g, 1, b );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x$1

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: BAD!?
 - eval returned: ('<crash[ <ref> is not defined ]>')

Final output calls: BAD!!
 - eval returned: ('<crash[ <ref> is not defined ]>')
