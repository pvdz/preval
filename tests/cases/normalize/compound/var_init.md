# Preval test case

# var_init.md

> Normalize > Compound > Var init
>
> Compound assignments should be decomposed. This means fewer cases to worry about. We can recompose them in the last step.

## Input

`````js filename=intro
let a = $(1);
var x = a += $(2);
$(x);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
const tmpNestedComplexRhs /*:primitive*/ = a + tmpBinBothRhs;
$(tmpNestedComplexRhs);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
$(a + $(2));
`````

## Pre Normal


`````js filename=intro
let x = undefined;
let a = $(1);
x = a += $(2);
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
let a = $(1);
const tmpNestedCompoundLhs = a;
const tmpBinBothLhs = tmpNestedCompoundLhs;
const tmpBinBothRhs = $(2);
const tmpNestedComplexRhs = tmpBinBothLhs + tmpBinBothRhs;
a = tmpNestedComplexRhs;
x = tmpNestedComplexRhs;
$(tmpNestedComplexRhs);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
