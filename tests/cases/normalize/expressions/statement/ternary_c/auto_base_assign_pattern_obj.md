# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Ternary c > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$(0) ? $(100) : ({ b } = $({ b: $(2) }));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
$(0) ? $(100) : ({ b: b } = $({ b: $(2) }));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
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
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs = $(tmpCalleeParam);
  b = tmpAssignObjPatternRhs.b;
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {};
const b = $( 0 );
if (b) {
  $( 100 );
}
else {
  const c = $( 2 );
  const d = { b: c };
  const e = $( d );
  a = e.b;
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
 - 1: 0
 - 2: 2
 - 3: { b: '2' }
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
