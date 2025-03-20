# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident unary typeof simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = typeof arg) + $(100));
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpStringConcatL /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const tmpCalleeParam /*:string*/ = `number${tmpStringConcatL}`;
$(tmpCalleeParam);
$(`number`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpStringConcatL = $coerce($(100), `plustr`);
$(`number${tmpStringConcatL}`);
$(`number`, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $coerce( a, "plustr" );
const c = `number${b}`;
$( c );
$( "number", 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 'number100'
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
