# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Arr spread > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$([...(a = { b } = $({ b: $(2) }))]);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
$([...(a = { b: b } = $({ b: $(2) }))]);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam$1 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
const tmpCalleeParam /*:array*/ = [...tmpNestedAssignObjPatternRhs];
$(tmpCalleeParam);
$(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
const d = c.b;
const e = [ ...c ];
$( e );
$( c, d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
