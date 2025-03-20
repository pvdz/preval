# Preval test case

# auto_ident_cond_simple_complex_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident cond simple complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = 1 ? $(2) : $($(100)))}  after`);
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(2);
const tmpBinBothRhs /*:string*/ = $coerce(a, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(2);
$(`before  ${a}  after`);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = $coerce( a, "string" );
const c = `before  ${b}  after`;
$( c );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 'before 2 after'
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
