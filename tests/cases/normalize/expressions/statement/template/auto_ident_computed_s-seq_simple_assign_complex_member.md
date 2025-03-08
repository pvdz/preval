# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Statement > Template > Auto ident computed s-seq simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(`before  ${((1, 2, b)[$("c")] = $(b)[$("d")])}  after`);
$(a, b);
`````

## Settled


`````js filename=intro
const varInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpBinBothRhs /*:string*/ = $coerce(varInitAssignLhsComputedRhs, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
$(`before  ${varInitAssignLhsComputedRhs}  after`);
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce(((1, 2, b)[$(`c`)] = $(b)[$(`d`)]), `string`) + `  after`);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
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
const a = $( "c" );
const b = {
  c: 10,
  d: 20,
};
const c = $( b );
const d = $( "d" );
const e = c[ d ];
b[a] = e;
const f = $coerce( e, "string" );
const g = `before  ${f}  after`;
$( g );
const h = {
  a: 999,
  b: 1000,
};
$( h, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 'before 20 after'
 - 5: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
