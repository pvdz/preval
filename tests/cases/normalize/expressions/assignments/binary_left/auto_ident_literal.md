# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Binary left > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = "foo") + $(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpStringConcatL /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const tmpCalleeParam /*:string*/ /*truthy*/ = `foo${tmpStringConcatL}`;
$(tmpCalleeParam);
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpStringConcatL = $coerce($(100), `plustr`);
$(`foo${tmpStringConcatL}`);
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $coerce( a, "plustr" );
const c = `foo${b}`;
$( c );
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = `foo`;
const tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
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
 - 2: 'foo100'
 - 3: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
