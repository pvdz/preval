# Preval test case

# auto_ident_call_prop_s-seq.md

> Normalize > Expressions > Assignments > Arr element > Auto ident call prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b).$(1)) + (a = (1, 2, b).$(1)));
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const a /*:unknown*/ = b.$(1);
const tmpClusterSSA_a /*:unknown*/ = b.$(1);
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const a = b.$(1);
const tmpClusterSSA_a = b.$(1);
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = (1, 2, b).$(1)) + (a = (1, 2, b).$(1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallObj = b;
a = tmpCallObj.$(1);
let tmpBinBothLhs = a;
const tmpCallObj$1 = b;
a = tmpCallObj$1.$(1);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = a.$( 1 );
const c = a.$( 1 );
const d = b + c;
$( d );
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
