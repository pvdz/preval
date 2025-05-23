# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident opt s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
(a = (1, 2, b)?.x).a;
$(a);
`````


## Settled


`````js filename=intro
$Number_prototype.a;
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Number_prototype.a;
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$Number_prototype.a;
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
const tmpCompObj = a;
tmpCompObj.a;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
