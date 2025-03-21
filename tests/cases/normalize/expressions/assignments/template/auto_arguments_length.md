# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Template > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = arguments)}  after`);
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = arguments;
const tmpBinBothRhs /*:string*/ = $coerce(arguments, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = arguments;
$(`before  ${arguments}  after`);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = arguments;
const b = $coerce( arguments, "string" );
const c = `before  ${b}  after`;
$( c );
$( a );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

arguments


## Runtime Outcome


Should call `$` with:
 - 1: 'before [object Arguments] after'
 - 2: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
