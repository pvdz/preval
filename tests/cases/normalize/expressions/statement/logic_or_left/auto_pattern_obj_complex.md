# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Logic or left > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$({ a: 1, b: 2 }) || $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1, b: 2 };
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
  $(999);
} else {
  $(100);
  $(999);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($({ a: 1, b: 2 })) {
  $(999);
} else {
  $(100);
  $(999);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
if (b) {
  $( 999 );
}
else {
  $( 100 );
  $( 999 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpBindingPatternObjRoot = { a: 999, b: 1000 };
let a = tmpBindingPatternObjRoot.a;
let tmpCalleeParam = { a: 1, b: 2 };
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  $(a);
} else {
  $(100);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
