# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Statement > Template > Auto ident cond c-seq s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(10, 20, $(30)) ? (40, 50, 60) : $($(100))}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  $(`before  60  after`);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(100);
  const tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpStringConcatL /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
  const tmpCalleeParam /*:string*/ = `before  ${tmpStringConcatL}  after`;
  $(tmpCalleeParam);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(30)) {
  $(`before  60  after`);
} else {
  $(`before  ${$($(100))}  after`);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
if (a) {
  $( "before  60  after" );
}
else {
  const b = $( 100 );
  const c = $( b );
  const d = $coerce( c, "string" );
  const e = `before  ${d}  after`;
  $( e );
}
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 'before 60 after'
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
