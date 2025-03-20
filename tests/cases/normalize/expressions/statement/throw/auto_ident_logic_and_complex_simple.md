# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident logic and complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw $($(1)) && 2;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpThrowArg /*:unknown*/ = $(tmpCalleeParam);
if (tmpThrowArg) {
  tmpThrowArg = 2;
} else {
}
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpThrowArg = $($(1));
if (tmpThrowArg) {
  tmpThrowArg = 2;
}
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  b = 2;
}
throw b;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
