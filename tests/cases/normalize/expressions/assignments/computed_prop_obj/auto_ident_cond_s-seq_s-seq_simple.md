# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident cond s-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = (10, 20, 30) ? (40, 50, 60) : $($(100)))["a"];
$(a);
`````


## Settled


`````js filename=intro
$Number_prototype.a;
$(60);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Number_prototype.a;
$(60);
`````


## PST Settled
With rename=true

`````js filename=intro
$Number_prototype.a;
$( 60 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpIfTest = 30;
if (tmpIfTest) {
  a = 60;
} else {
  let tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
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
 - 1: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
