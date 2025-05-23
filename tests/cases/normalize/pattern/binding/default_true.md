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
const tmpOPBD /*:unknown*/ = $Object_prototype.a;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
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


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.a;
const b = a === undefined;
if (b) {
  $( "default" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternObjRoot = {};
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
 - 1: 'default'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
