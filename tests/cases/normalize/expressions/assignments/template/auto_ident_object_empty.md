# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Assignments > Template > Auto ident object empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = {})}  after`);
$(a);
`````


## Settled


`````js filename=intro
const a /*:object*/ = {};
const tmpBinBothRhs /*:string*/ = $coerce(a, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = {};
$(`before  ${a}  after`);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = $coerce( a, "string" );
const c = `before  ${b}  after`;
$( c );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before [object Object] after'
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
