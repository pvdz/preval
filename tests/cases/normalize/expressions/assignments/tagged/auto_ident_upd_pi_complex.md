# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$`before ${(a = ++$($(b)).x)} after`;
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam$3 /*:unknown*/ = $(b);
const tmpNestedAssignObj /*:unknown*/ = $(tmpCalleeParam$3);
const tmpBinLhs /*:unknown*/ = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs /*:primitive*/ = tmpBinLhs + 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, tmpNestedPropCompoundComplexRhs);
$(tmpNestedPropCompoundComplexRhs, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpNestedAssignObj = $($(b));
const tmpNestedPropCompoundComplexRhs = tmpNestedAssignObj.x + 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
$([`before `, ` after`], tmpNestedPropCompoundComplexRhs);
$(tmpNestedPropCompoundComplexRhs, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = ++$($(b)).x));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$3 = $(b);
const tmpNestedAssignObj = $(tmpCalleeParam$3);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
a = tmpNestedPropCompoundComplexRhs;
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = d + 1;
c.x = e;
const f = [ "before ", " after" ];
$( f, e );
$( e, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: ['before ', ' after'], 2
 - 4: 2, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
