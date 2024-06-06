# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Tagged > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$`before ${(a = { b } = $({ b: $(2) }))} after`;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = { b: b } = $({ b: $(2) })));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpCallCallee$1 = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam$3 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$3);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Output


`````js filename=intro
const tmpCalleeParam = [`before `, ` after`];
const tmpObjLitVal = $(2);
const tmpCalleeParam$3 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$3);
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
$(tmpCalleeParam, tmpNestedAssignObjPatternRhs);
$(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
const b = $( 2 );
const c = { b: b };
const d = $( c );
const e = d.b;
$( a, d );
$( d, e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: ['before ', ' after'], { b: '2' }
 - 4: { b: '2' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
