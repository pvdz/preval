# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Assignments > Template > Auto ident computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${(a = $(b)[$("c")])}  after`);
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpAssignRhsCompObj /*:unknown*/ = $(b);
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
const tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
const tmpBinBothRhs /*:string*/ = $coerce(tmpClusterSSA_a, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(tmpClusterSSA_a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $(`c`);
const tmpClusterSSA_a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(`before  ${tmpClusterSSA_a}  after`);
$(tmpClusterSSA_a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = $(b)[$(`c`)]), `string`) + `  after`);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $(`c`);
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
const e = $coerce( d, "string" );
const f = `before  ${e}  after`;
$( f );
$( d, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 'before 1 after'
 - 4: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
