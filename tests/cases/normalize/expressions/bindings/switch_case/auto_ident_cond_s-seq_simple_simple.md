# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident cond s-seq simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = (10, 20, 30) ? $(2) : $($(100));
    $(a);
}
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(2);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(2));
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    a = (10, 20, 30) ? $(2) : $($(100));
    $(a);
  } else {
  }
}
`````

## Normalized


`````js filename=intro
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  const tmpIfTest$1 = 30;
  if (tmpIfTest$1) {
    a = $(2);
  } else {
    const tmpCalleeParam = $(100);
    a = $(tmpCalleeParam);
  }
  $(a);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
