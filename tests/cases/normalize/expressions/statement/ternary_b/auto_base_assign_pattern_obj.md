# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Ternary b > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$(1) ? ({ b } = $({ b: $(2) })) : $(200);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
$(1) ? ({ b: b } = $({ b: $(2) })) : $(200);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs = $(tmpCalleeParam);
  b = tmpAssignObjPatternRhs.b;
} else {
  $(200);
}
$(a, b);
`````

## Output


`````js filename=intro
let b /*:unknown*/ = {};
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpObjLitVal /*:unknown*/ = $(2);
  const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  b = tmpAssignObjPatternRhs.b;
} else {
  $(200);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {};
const b = $( 1 );
if (b) {
  const c = $( 2 );
  const d = { b: c };
  const e = $( d );
  a = e.b;
}
else {
  $( 200 );
}
const f = {
  a: 999,
  b: 1000,
};
$( f, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { b: '2' }
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
