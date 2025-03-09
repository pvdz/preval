# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident logic or complex complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($(0)) || $($(2));
    $(a);
}
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  $(a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
  $(tmpClusterSSA_a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(0));
if (a) {
  $(a);
} else {
  $($($(2)));
}
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let a;
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    a = $($(0)) || $($(2));
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
  const tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
    $(a);
  } else {
    const tmpCalleeParam$1 = $(2);
    a = $(tmpCalleeParam$1);
    $(a);
  }
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $( b );
}
else {
  const c = $( 2 );
  const d = $( c );
  $( d );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
