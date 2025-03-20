# Preval test case

# auto_ident_new_computed_simple_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident new computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(`before  ${(a = new b["$"](1))}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_a /*:object*/ = new $(1);
const tmpBinBothRhs /*:string*/ = $coerce(tmpClusterSSA_a, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = new $(1);
$(`before  ${tmpClusterSSA_a}  after`);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
const b = $coerce( a, "string" );
const c = `before  ${b}  after`;
$( c );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'before [object Object] after'
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
