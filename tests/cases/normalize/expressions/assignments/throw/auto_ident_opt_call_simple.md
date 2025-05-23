# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = $?.(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:boolean*/ = $ == null;
let tmpThrowArg /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest) {
} else {
  tmpThrowArg = $(1);
}
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $ == null;
let tmpThrowArg = undefined;
if (!tmpIfTest) {
  tmpThrowArg = $(1);
}
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
let b = undefined;
if (a) {

}
else {
  b = $( 1 );
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
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
