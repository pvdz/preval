# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(({ a } = $({ a: 1, b: 2 })) + ({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$(({ a: a } = $({ a: 1, b: 2 })) + ({ a: a } = $({ a: 1, b: 2 })));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
let tmpBinBothLhs = undefined;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
a = tmpNestedAssignObjPatternRhs.a;
tmpBinBothLhs = tmpNestedAssignObjPatternRhs;
let tmpBinBothRhs = undefined;
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs$1 = tmpCallCallee$3(tmpCalleeParam$3);
a = tmpNestedAssignObjPatternRhs$1.a;
tmpBinBothRhs = tmpNestedAssignObjPatternRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
tmpNestedAssignObjPatternRhs.a;
const tmpCalleeParam$3 /*:object*/ = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
const tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignObjPatternRhs$1.a;
const tmpCalleeParam /*:primitive*/ = tmpNestedAssignObjPatternRhs + tmpNestedAssignObjPatternRhs$1;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
b.a;
const c = {
  a: 1,
  b: 2,
};
const d = $( c );
const e = d.a;
const f = b + d;
$( f );
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: { a: '1', b: '2' }
 - 3: '[object Object][object Object]'
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
