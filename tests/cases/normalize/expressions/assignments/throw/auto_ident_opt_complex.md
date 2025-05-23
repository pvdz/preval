# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > Throw > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
throw (a = $(b)?.x);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpThrowArg /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest) {
} else {
  tmpThrowArg = tmpChainElementCall.x;
}
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $({ x: 1 });
const tmpIfTest = tmpChainElementCall == null;
let tmpThrowArg = undefined;
if (!tmpIfTest) {
  tmpThrowArg = tmpChainElementCall.x;
}
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
let d = undefined;
if (c) {

}
else {
  d = b.x;
}
throw d;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
