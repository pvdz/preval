# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident unary excl simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = 1;

    let a = !arg;
    $(a, arg);
}
`````


## Settled


`````js filename=intro
$(false, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = undefined;
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  arg = 1;
  a = !arg;
  $(a, arg);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
