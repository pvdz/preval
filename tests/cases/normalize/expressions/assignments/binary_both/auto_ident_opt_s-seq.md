# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Assignments > Binary both > Auto ident opt s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b)?.x) + (a = (1, 2, b)?.x));
$(a);
`````


## Settled


`````js filename=intro
$(2);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
const tmpBinBothLhs = a;
a = undefined;
const tmpChainRootProp$1 = b;
const tmpIfTest$1 = tmpChainRootProp$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementObject$1 = tmpChainRootProp$1.x;
  a = tmpChainElementObject$1;
} else {
}
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
