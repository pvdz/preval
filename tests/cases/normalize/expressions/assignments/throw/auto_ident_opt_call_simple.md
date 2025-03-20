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
let tmpThrowArg /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  tmpThrowArg = tmpChainElementCall;
}
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpThrowArg = undefined;
if (!($ == null)) {
  tmpThrowArg = $(1);
}
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
if (b) {

}
else {
  const c = $( 1 );
  a = c;
}
throw a;
`````


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
