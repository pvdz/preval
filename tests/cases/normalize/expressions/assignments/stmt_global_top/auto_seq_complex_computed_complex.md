# Preval test case

# auto_seq_complex_computed_complex.md

> Normalize > Expressions > Assignments > Stmt global top > Auto seq complex computed complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(a = { b: $(1) })($(1), $(a))[$("b")] = $(2);
$(a);

//*/// (end of file artifact)
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
(a = { b: $(1) })($(1), $(a))[$(`b`)] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCallCallee = a;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(a);
const tmpAssignComMemLhsObj = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpCalleeParam = $(1);
const a = { b: tmpObjLitVal };
const tmpCalleeParam$1 = $(a);
const tmpAssignComMemLhsObj = a(tmpCalleeParam, tmpCalleeParam$1);
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedRhs = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = { b: a };
const d = $( c );
const e = c( b, d );
const f = $( "b" );
const g = $( 2 );
e[f] = g;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { b: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
