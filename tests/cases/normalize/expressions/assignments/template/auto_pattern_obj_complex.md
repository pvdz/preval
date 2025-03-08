# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Template > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(`before  ${({ a } = $({ a: 1, b: 2 }))}  after`);
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:object*/ = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$3);
const tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignObjPatternRhs.a;
const tmpBinBothRhs /*:string*/ = $coerce(tmpNestedAssignObjPatternRhs, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignObjPatternRhs = $({ a: 1, b: 2 });
const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
$(`before  ${tmpNestedAssignObjPatternRhs}  after`);
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$(`before  ` + $coerce(({ a: a } = $({ a: 1, b: 2 })), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpBinBothLhs = `before  `;
let tmpCalleeParam$1 = undefined;
const tmpCalleeParam$3 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$3);
a = tmpNestedAssignObjPatternRhs.a;
tmpCalleeParam$1 = tmpNestedAssignObjPatternRhs;
const tmpBinBothRhs = $coerce(tmpNestedAssignObjPatternRhs, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
const c = b.a;
const d = $coerce( b, "string" );
const e = `before  ${d}  after`;
$( e );
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 'before [object Object] after'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
