# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident c-opt simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$({ ...(a = b?.["x"]) });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = {};
$(tmpCalleeParam);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({});
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
$( a );
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
  const tmpChainRootComputed = `x`;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  a = tmpChainElementObject;
} else {
}
const tmpObjSpread = a;
let tmpCalleeParam = { ...tmpObjSpread };
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
