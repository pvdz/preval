# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = [1, 2, 3]));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpStringConcatR /*:string*/ = $coerce(tmpBinBothLhs, `plustr`);
const tmpCalleeParam /*:string*/ = `${tmpStringConcatR}1,2,3`;
$(tmpCalleeParam);
const a /*:array*/ = [1, 2, 3];
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpStringConcatR = $coerce($(100), `plustr`);
$(`${tmpStringConcatR}1,2,3`);
$([1, 2, 3]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $coerce( a, "plustr" );
const c = `${b}1,2,3`;
$( c );
const d = [ 1, 2, 3 ];
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
a = [1, 2, 3];
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '1001,2,3'
 - 3: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
