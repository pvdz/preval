# Preval test case

# ident_nested_complex_member_assigns2.md

> Normalize > Expressions > Statement > Param default > Ident nested complex member assigns2
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  a = y;
}

let a = 1;
const x = 3;
const y = x;

f();

$(100, a);
`````


## Settled


`````js filename=intro
$(100, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100, 3 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
