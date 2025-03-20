# Preval test case

# obj_ternary2.md

> Normalize > Pattern > Assignment > Obj ternary2
>
> Regression from obj param with default

Regression was causing infinite loop

## Input

`````js filename=intro
let bindingPatternObjRoot = undefined;
if ($) {
  bindingPatternObjRoot = 1;
} else {
  bindingPatternObjRoot = 2;
}
$(bindingPatternObjRoot);
`````


## Settled


`````js filename=intro
if ($) {
  $(1);
} else {
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(1);
} else {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 1 );
}
else {
  $( 2 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
