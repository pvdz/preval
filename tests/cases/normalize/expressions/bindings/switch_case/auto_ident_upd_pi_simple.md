# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident upd pi simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = 1;

    let a = ++b;
    $(a, b);
}
`````


## Settled


`````js filename=intro
$(2, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2, 2 );
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
  const tmpPostUpdArgIdent = $coerce(b, `number`);
  b = tmpPostUpdArgIdent + 1;
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
 - 1: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
