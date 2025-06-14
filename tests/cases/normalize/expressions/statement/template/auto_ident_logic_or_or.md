# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Template > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$($(0)) || $($(1)) || $($(2))}  after`);
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
  } else {
    const tmpCalleeParam$7 /*:unknown*/ = $(2);
    tmpCalleeParam$1 = $(tmpCalleeParam$7);
  }
}
const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const tmpCalleeParam /*:string*/ /*truthy*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam$1 = $($(0));
if (!tmpCalleeParam$1) {
  tmpCalleeParam$1 = $($(1));
  if (!tmpCalleeParam$1) {
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

  }
  else {
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
let tmpCalleeParam$3 = $(0);
let tmpCalleeParam$1 = $(tmpCalleeParam$3);
if (tmpCalleeParam$1) {
} else {
  let tmpCalleeParam$5 = $(1);
  tmpCalleeParam$1 = $(tmpCalleeParam$5);
  if (tmpCalleeParam$1) {
  } else {
    let tmpCalleeParam$7 = $(2);
    tmpCalleeParam$1 = $(tmpCalleeParam$7);
  }
}
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 'before 1 after'
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
