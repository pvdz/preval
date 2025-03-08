# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Template > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(`before  ${(b = $(2))}  after`);
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:unknown*/ = $(2);
const tmpBinBothRhs /*:string*/ = $coerce(b, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $(2);
$(`before  ${b}  after`);
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((b = $(2)), `string`) + `  after`);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
b = $(2);
let tmpCalleeParam$1 = b;
const tmpBinBothRhs = $coerce(b, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = $coerce( a, "string" );
const c = `before  ${b}  after`;
$( c );
const d = {
  a: 999,
  b: 1000,
};
$( d, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 'before 2 after'
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
