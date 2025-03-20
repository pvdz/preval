# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Statement > Throw > Auto ident delete prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
throw delete ($(1), $(2), $(arg)).y;
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpThrowArg /*:boolean*/ = delete tmpDeleteObj.y;
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpDeleteObj = $({ y: 1 });
const tmpThrowArg = delete tmpDeleteObj.y;
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
throw c;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - eval returned: ('<crash[ true ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
