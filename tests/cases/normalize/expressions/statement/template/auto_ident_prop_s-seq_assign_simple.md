# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Statement > Template > Auto ident prop s-seq assign simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${((1, 2, b).c = 2)}  after`);
$(a, b);
`````

## Settled


`````js filename=intro
$(`before  2  after`);
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { c: 2 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  2  after`);
$({ a: 999, b: 1000 }, { c: 2 });
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce(((1, 2, b).c = 2), `string`) + `  after`);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedRhs = 2;
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
const tmpCalleeParam$1 = varInitAssignLhsComputedRhs;
const tmpBinBothRhs = $coerce(varInitAssignLhsComputedRhs, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "before  2  after" );
const a = {
  a: 999,
  b: 1000,
};
const b = { c: 2 };
$( a, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'before 2 after'
 - 2: { a: '999', b: '1000' }, { c: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
