# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > Throw > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
throw (1, 2, $(b))?.x;
$(a);
`````


## Settled


`````js filename=intro
let tmpThrowArg /*:unknown*/ /*ternaryConst*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
if (tmpIfTest) {
} else {
  tmpThrowArg = tmpChainRootProp.x;
}
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpThrowArg = undefined;
const tmpChainRootProp = $({ x: 1 });
if (!(tmpChainRootProp == null)) {
  tmpThrowArg = tmpChainRootProp.x;
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
  a = c.x;
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
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
