# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Statement > Binary right > Auto ident prop s-seq assign simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(100) + ((1, 2, b).c = 2);
$(a, b);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
tmpBinBothLhs + 0;
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { c: 2 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100) + 0;
$({ a: 999, b: 1000 }, { c: 2 });
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(100) + ((1, 2, b).c = 2);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedRhs = 2;
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
const tmpBinBothRhs = varInitAssignLhsComputedRhs;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
a + 0;
const b = {
  a: 999,
  b: 1000,
};
const c = { c: 2 };
$( b, c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, { c: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
