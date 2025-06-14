# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Binary right > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = "foo"));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpStringConcatR /*:string*/ = $coerce(tmpBinBothLhs, `plustr`);
const tmpCalleeParam /*:string*/ /*truthy*/ = `${tmpStringConcatR}foo`;
$(tmpCalleeParam);
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpStringConcatR = $coerce($(100), `plustr`);
$(`${tmpStringConcatR}foo`);
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $coerce( a, "plustr" );
const c = `${b}foo`;
$( c );
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
a = `foo`;
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '100foo'
 - 3: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
