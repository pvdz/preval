# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident object simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = { x: 1, y: 2, z: 3 };
    $(a);
}
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = { x: 1, y: 2, z: 3 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: 1, y: 2, z: 3 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  a = { x: 1, y: 2, z: 3 };
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
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
