# Preval test case

# default_true.md

> Normalize > Pattern > Binding > Default true
>
> Assignment pattern with default

## Input

`````js filename=intro
const {
  a: b = $('default')
} = {
};
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = $Object_prototype.a;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  $(`default`);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($Object_prototype.a === undefined) {
  $(`default`);
}
`````

## Pre Normal


`````js filename=intro
const { a: b = $(`default`) } = {};
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = {};
const objPatternBeforeDefault = bindingPatternObjRoot.a;
let b = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  b = $(`default`);
} else {
  b = objPatternBeforeDefault;
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.a;
const b = a === undefined;
if (b) {
  $( "default" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'default'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
