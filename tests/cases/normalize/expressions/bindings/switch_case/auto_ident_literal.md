# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Bindings > Switch case > Auto ident literal
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = "foo";
    $(a);
}
`````


## Settled


`````js filename=intro
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  a = `foo`;
  $(a);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
