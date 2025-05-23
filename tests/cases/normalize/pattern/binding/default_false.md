# Preval test case

# default_false.md

> Normalize > Pattern > Binding > Default false
>
> Assignment pattern with default

## Input

`````js filename=intro
const {
  a: b = $('default')
} = {
  a: $('prop')
};
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(`prop`);
const tmpIfTest /*:boolean*/ = tmpObjLitVal === undefined;
if (tmpIfTest) {
  $(`default`);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`prop`) === undefined) {
  $(`default`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "prop" );
const b = a === undefined;
if (b) {
  $( "default" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(`prop`);
const tmpBindingPatternObjRoot = { a: tmpObjLitVal };
const tmpOPBD = tmpBindingPatternObjRoot.a;
let b = undefined;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  b = $(`default`);
} else {
  b = tmpOPBD;
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'prop'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
