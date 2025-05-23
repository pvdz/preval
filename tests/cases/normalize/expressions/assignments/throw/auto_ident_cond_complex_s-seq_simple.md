# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident cond complex s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = $(1) ? (40, 50, 60) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
let tmpThrowArg /*:unknown*/ /*ternaryConst*/ = 60;
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
const tmpIfTest = $(1);
let tmpThrowArg = 60;
if (!tmpIfTest) {
  tmpThrowArg = $($(100));
}
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 60;
if (a) {

}
else {
  const c = $( 100 );
  b = $( c );
}
throw b;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ 60 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
