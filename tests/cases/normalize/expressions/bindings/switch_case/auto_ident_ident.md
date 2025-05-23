# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Bindings > Switch case > Auto ident ident
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = 1;

    let a = b;
    $(a, b);
}
`````


## Settled


`````js filename=intro
$(1, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = undefined;
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  b = 1;
  a = b;
  $(b, b);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
