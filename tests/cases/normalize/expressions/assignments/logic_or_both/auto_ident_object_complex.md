# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: $(1), y: 2, z: $(3) }) || (a = { x: $(1), y: 2, z: $(3) }));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: $(1), y: 2, z: $(3) }) || (a = { x: $(1), y: 2, z: $(3) }));
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
} else {
  const tmpObjLitVal$5 = $(1);
  const tmpObjLitVal$7 = 2;
  const tmpObjLitVal$9 = $(3);
  const tmpNestedComplexRhs = { x: tmpObjLitVal$5, y: tmpObjLitVal$7, z: tmpObjLitVal$9 };
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const tmpObjLitVal$3 /*:unknown*/ = $(3);
let a /*:unknown*/ = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
if (a) {
  $(a);
} else {
  const tmpObjLitVal$5 /*:unknown*/ = $(1);
  const tmpObjLitVal$9 /*:unknown*/ = $(3);
  const tmpNestedComplexRhs /*:object*/ = { x: tmpObjLitVal$5, y: 2, z: tmpObjLitVal$9 };
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
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
if (c) {
  $( c );
}
else {
  const d = $( 1 );
  const e = $( 3 );
  const f = {
    x: d,
    y: 2,
    z: e,
  };
  c = f;
  $( f );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { x: '1', y: '2', z: '3' }
 - 4: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
