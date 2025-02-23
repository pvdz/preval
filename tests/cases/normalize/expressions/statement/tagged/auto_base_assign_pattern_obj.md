# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Tagged > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$`before ${({ b } = $({ b: $(2) }))} after`;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
$([`before `, ` after`], ({ b: b } = $({ b: $(2) })));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$1 = undefined;
const tmpCallCallee$1 = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam$3 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$3);
b = tmpNestedAssignObjPatternRhs.b;
tmpCalleeParam$1 = tmpNestedAssignObjPatternRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(2);
const tmpCalleeParam$3 /*:object*/ = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$3);
const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, tmpNestedAssignObjPatternRhs);
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
const e = [ "before ", " after" ];
$( e, c );
const f = {
  a: 999,
  b: 1000,
};
$( f, d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: ['before ', ' after'], { b: '2' }
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
