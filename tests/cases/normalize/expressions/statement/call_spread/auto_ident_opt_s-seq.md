# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Statement > Call spread > Auto ident opt s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(...(1, 2, b)?.x);
$(a);
`````


## Settled


`````js filename=intro
$(...1);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(...1);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( ...1 );
const a = {
  a: 999,
  b: 1000,
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParamSpread = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpCalleeParamSpread = tmpChainElementObject;
} else {
}
$(...tmpCalleeParamSpread);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
