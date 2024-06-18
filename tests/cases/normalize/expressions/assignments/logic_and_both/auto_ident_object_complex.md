# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: $(1), y: 2, z: $(3) }) && (a = { x: $(1), y: 2, z: $(3) }));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: $(1), y: 2, z: $(3) }) && (a = { x: $(1), y: 2, z: $(3) }));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpObjLitVal$5 = $(1);
  const tmpObjLitVal$7 = 2;
  const tmpObjLitVal$9 = $(3);
  const tmpNestedComplexRhs = { x: tmpObjLitVal$5, y: tmpObjLitVal$7, z: tmpObjLitVal$9 };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
let a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
const tmpCalleeParam = a;
if (a) {
  const tmpObjLitVal$5 = $(1);
  const tmpObjLitVal$9 = $(3);
  const tmpNestedComplexRhs = { x: tmpObjLitVal$5, y: 2, z: tmpObjLitVal$9 };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
let c = {
  x: a,
  y: 2,
  z: b,
};
const d = c;
if (c) {
  const e = $( 1 );
  const f = $( 3 );
  const g = {
    x: e,
    y: 2,
    z: f,
  };
  c = g;
  $( g );
}
else {
  $( d );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1
 - 4: 3
 - 5: { x: '1', y: '2', z: '3' }
 - 6: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
