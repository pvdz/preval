# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Let > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
let xyz = ({ b } = $({ b: $(2) }));
$(xyz);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let xyz = ({ b: b } = $({ b: $(2) }));
$(xyz);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let xyz = undefined;
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
xyz = tmpNestedAssignObjPatternRhs;
$(xyz);
$(a, b);
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
$(tmpNestedAssignObjPatternRhs);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
const d = c.b;
$( c );
const e = {
  a: 999,
  b: 1000,
};
$( e, d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { b: '2' }
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
