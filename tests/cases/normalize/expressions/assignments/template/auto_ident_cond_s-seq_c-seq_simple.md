# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident cond s-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = (10, 20, 30) ? (40, 50, $(60)) : $($(100)))}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpSSA_a /*:unknown*/ = $(60);
const tmpStringConcatL /*:string*/ = $coerce(tmpSSA_a, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpStringConcatL}  after`;
$(tmpCalleeParam);
$(tmpSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSSA_a = $(60);
$(`before  ${tmpSSA_a}  after`);
$(tmpSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
const b = $coerce( a, "string" );
const c = `before  ${b}  after`;
$( c );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpIfTest = 30;
if (tmpIfTest) {
  a = $(60);
} else {
  let tmpCalleeParam$3 = $(100);
  a = $(tmpCalleeParam$3);
}
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(a, `string`);
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
 - 1: 60
 - 2: 'before 60 after'
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
