# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident new prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ((a = new (1, 2, b).$(1))) {
  default:
    $(100);
}
$(a);
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = new $(1);
$(100);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = new $(1);
$(100);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
$( 100 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
a = new tmpNewCallee(1);
const tmpSwitchDisc = a;
$(100);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
