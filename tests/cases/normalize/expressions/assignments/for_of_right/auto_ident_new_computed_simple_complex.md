# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Assignments > For of right > Auto ident new computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (let x of (a = new b[$("$")](1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpNewCallee /*:unknown*/ = b[tmpCompProp];
const tmpClusterSSA_a /*:object*/ = new tmpNewCallee(1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpClusterSSA_a);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = $(`\$`);
const tmpNewCallee = { $: $ }[tmpCompProp];
const tmpClusterSSA_a = new tmpNewCallee(1);
const tmpForOfGen = $forOf(tmpClusterSSA_a);
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    tmpForOfNext.value;
  }
}
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = new c( 1 );
const e = $forOf( d );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = e();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    f.value;
  }
}
$( d );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
