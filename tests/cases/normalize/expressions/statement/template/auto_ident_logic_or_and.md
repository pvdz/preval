# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Template > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$($(0)) || ($($(1)) && $($(2)))}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(0);
let tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$3);
if (tmpCalleeParam$1) {
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  tmpCalleeParam$1 = $(tmpCalleeParam$5);
  if (tmpCalleeParam$1) {
    const tmpCalleeParam$7 /*:unknown*/ = $(2);
    tmpCalleeParam$1 = $(tmpCalleeParam$7);
  } else {
  }
}
const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam$1 = $($(0));
if (!tmpCalleeParam$1) {
  tmpCalleeParam$1 = $($(1));
  if (tmpCalleeParam$1) {
    tmpCalleeParam$1 = $($(2));
  }
}
$(`before  ${tmpCalleeParam$1}  after`);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
const e = $coerce( b, "string" );
const f = `before  ${e}  after`;
$( f );
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 'before 2 after'
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
