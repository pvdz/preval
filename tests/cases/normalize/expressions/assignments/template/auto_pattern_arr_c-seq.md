# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Template > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(`before  ${([a] = ($(10), $(20), $([1, 2])))}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [1, 2];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$3);
const tmpArrPatternSplat$1 /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
const a /*:unknown*/ = tmpArrPatternSplat$1[0];
const tmpBinBothRhs /*:string*/ = $coerce(tmpNestedAssignArrPatternRhs, `string`);
const tmpCalleeParam /*:string*/ /*truthy*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = $([1, 2]);
const a = [...tmpNestedAssignArrPatternRhs][0];
$(`before  ${tmpNestedAssignArrPatternRhs}  after`);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
[ ...a ];
$( 10 );
$( 20 );
const b = [ 1, 2 ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
const f = $coerce( c, "string" );
const g = `before  ${f}  after`;
$( g );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpBindingPatternArrRoot = { a: 999, b: 1000 };
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat[0];
const tmpBinBothLhs = `before  `;
let tmpCalleeParam$1 = undefined;
$(10);
$(20);
let tmpCalleeParam$3 = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$3);
const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = tmpArrPatternSplat$1[0];
tmpCalleeParam$1 = tmpNestedAssignArrPatternRhs;
const tmpBinBothRhs = $coerce(tmpNestedAssignArrPatternRhs, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
