# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw $(1) ? 2 : $($(100));
$(a);
`````


## Settled


`````js filename=intro
let tmpThrowArg /*:unknown*/ /*ternaryConst*/ = 2;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpThrowArg = $(tmpCalleeParam);
}
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpThrowArg = 2;
if (!$(1)) {
  tmpThrowArg = $($(100));
}
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 2;
const b = $( 1 );
if (b) {

}
else {
  const c = $( 100 );
  a = $( c );
}
throw a;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
