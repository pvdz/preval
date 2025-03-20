# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Template > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$(`before  ${(a = ($(1), $(2), $(x)))}  after`);
$(a, x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const a /*:unknown*/ = $(1);
const tmpBinBothRhs /*:string*/ = $coerce(a, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const a = $(1);
$(`before  ${a}  after`);
$(a, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
const b = $coerce( a, "string" );
const c = `before  ${b}  after`;
$( c );
$( a, 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 'before 1 after'
 - 5: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
