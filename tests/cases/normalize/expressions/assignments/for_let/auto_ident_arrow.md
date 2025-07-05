# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > For let > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = () => {}); ; $(1)) $(xyz);
$(a);
`````


## Settled


`````js filename=intro
const xyz /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
while ($LOOP_NO_UNROLLS_LEFT) {
  $(xyz);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const xyz = function $pcompiled() {};
while (true) {
  $(xyz);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  return undefined;
};
while ($LOOP_NO_UNROLLS_LEFT) {
  $( a );
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = function () {
  debugger;
  return undefined;
};
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: 1
 - 3: '<function>'
 - 4: 1
 - 5: '<function>'
 - 6: 1
 - 7: '<function>'
 - 8: 1
 - 9: '<function>'
 - 10: 1
 - 11: '<function>'
 - 12: 1
 - 13: '<function>'
 - 14: 1
 - 15: '<function>'
 - 16: 1
 - 17: '<function>'
 - 18: 1
 - 19: '<function>'
 - 20: 1
 - 21: '<function>'
 - 22: 1
 - 23: '<function>'
 - 24: 1
 - 25: '<function>'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
