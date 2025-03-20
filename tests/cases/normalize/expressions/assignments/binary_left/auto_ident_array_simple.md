# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [1, 2, 3]) + $(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpStringConcatL /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const tmpCalleeParam /*:string*/ = `1,2,3${tmpStringConcatL}`;
$(tmpCalleeParam);
const a /*:array*/ = [1, 2, 3];
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpStringConcatL = $coerce($(100), `plustr`);
$(`1,2,3${tmpStringConcatL}`);
$([1, 2, 3]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $coerce( a, "plustr" );
const c = `1,2,3${b}`;
$( c );
const d = [ 1, 2, 3 ];
$( d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '1,2,3100'
 - 3: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
