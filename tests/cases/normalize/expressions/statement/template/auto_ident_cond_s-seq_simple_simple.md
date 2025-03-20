# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Statement > Template > Auto ident cond s-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(10, 20, 30) ? $(2) : $($(100))}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpBinBothRhs /*:string*/ = $coerce(tmpClusterSSA_tmpCalleeParam$1, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  ${$(2)}  after`);
$({ a: 999, b: 1000 });
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
$( d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 'before 2 after'
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
