# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident new prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$({ [(a = new (1, 2, b).$(1))]: 10 });
$(a);
`````

## Settled


`````js filename=intro
const tmpClusterSSA_a /*:object*/ = new $(1);
const tmpCalleeParam /*:object*/ = { [tmpClusterSSA_a]: 10 };
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = new $(1);
$({ [tmpClusterSSA_a]: 10 });
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$({ [(a = new (1, 2, b).$(1))]: 10 });
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
a = new tmpNewCallee(1);
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
const b = { [ a ]: 10 };
$( b );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { '[object Object]': '10' }
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
