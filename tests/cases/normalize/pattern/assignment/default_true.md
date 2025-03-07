# Preval test case

# default_true.md

> Normalize > Pattern > Assignment > Default true
>
> Assignment pattern with default

## Input

`````js filename=intro
let b
({
  a: b = $('default')
} = {
  
});
$(b);
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = $Object_prototype.a;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpClusterSSA_b /*:unknown*/ = $(`default`);
  $(tmpClusterSSA_b);
} else {
  $(objPatternBeforeDefault);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = $Object_prototype.a;
if (objPatternBeforeDefault === undefined) {
  $($(`default`));
} else {
  $(objPatternBeforeDefault);
}
`````

## Pre Normal


`````js filename=intro
let b;
({ a: b = $(`default`) } = {});
$(b);
`````

## Normalized


`````js filename=intro
let b = undefined;
const tmpAssignObjPatternRhs = {};
const objPatternBeforeDefault = tmpAssignObjPatternRhs.a;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  b = $(`default`);
} else {
  b = objPatternBeforeDefault;
}
$(b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.a;
const b = a === undefined;
if (b) {
  const c = $( "default" );
  $( c );
}
else {
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'default'
 - 2: 'default'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
