# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Statement > Throw > Auto ident call complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
throw $($)($(1), $(2));
$(a);
`````


## Settled


`````js filename=intro
const tmpCallCallee /*:unknown*/ = $($);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpThrowArg /*:unknown*/ = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCallee = $($);
const tmpThrowArg = tmpCallCallee($(1), $(2));
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
const d = a( b, c );
throw d;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
