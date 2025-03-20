# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident new complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw new ($($))(1);
$(a);
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
const tmpThrowArg /*:object*/ = new tmpNewCallee(1);
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
const tmpThrowArg = new tmpNewCallee(1);
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = new a( 1 );
throw b;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - eval returned: ('<crash[ [object Object] ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
