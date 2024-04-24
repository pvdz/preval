# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Logic or right > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$(100) || ({ b } = $({ b: $(2) }));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
$(100) || ({ b: b } = $({ b: $(2) }));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  const tmpCallCallee = $;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  b = tmpAssignObjPatternRhs.b;
}
$(a, b);
`````

## Output

`````js filename=intro
let b = {};
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs = $(tmpCalleeParam);
  b = tmpAssignObjPatternRhs.b;
  $(a, b);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = {};
const b = $( 100 );
const c = {
a: 999,
b: 1000
;
if (b) {
  $( c, a );
}
else {
  const d = $( 2 );
  const e = { b: d };
  const f = $( e );
  a = f.b;
  $( c, a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
