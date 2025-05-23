# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
throw $(b)?.[$("x")];
$(a);
`````


## Settled


`````js filename=intro
let tmpThrowArg /*:unknown*/ /*ternaryConst*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  tmpThrowArg = tmpChainElementCall[tmpChainRootComputed];
}
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpThrowArg = undefined;
const tmpChainElementCall = $({ x: 1 });
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`x`);
  tmpThrowArg = tmpChainElementCall[tmpChainRootComputed];
}
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = $( "x" );
  a = c[ e ];
}
throw a;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
