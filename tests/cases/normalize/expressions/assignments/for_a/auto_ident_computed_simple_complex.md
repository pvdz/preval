# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Assignments > For a > Auto ident computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (a = b[$("c")]; ; $(1));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
$coerce(tmpAssignRhsCompProp, `string`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($(`c`), `string`);
while (true) {
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
$coerce( a, "string" );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsCompObj = b;
const tmpAssignRhsCompProp = $(`c`);
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
while (true) {
  $(1);
}
`````


## Todos triggered


- (todo) Support non-primitive in first arg to $coerce
- (todo) do we want to support MemberExpression as expression statement in free loops?
- (todo) regular property access of an ident feels tricky;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
