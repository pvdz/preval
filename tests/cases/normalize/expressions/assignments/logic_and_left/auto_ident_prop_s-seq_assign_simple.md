# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident prop s-seq assign simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b).c = 2) && $(100));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpSSA_tmpCalleeParam);
const b /*:object*/ /*truthy*/ = { c: 2 };
$(2, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$(2, { c: 2 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
const b = { c: 2 };
$( 2, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpNestedAssignObj = b;
const tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a, b);
} else {
  $(tmpCalleeParam);
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 2, { c: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
