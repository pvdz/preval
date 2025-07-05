# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Statement > For let > Auto ident arr pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let xyz = ([x, y] = [$(3), $(4)]); ; $(1)) $(xyz);
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
const tmpNestedAssignArrPatternRhs /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1];
while ($LOOP_NO_UNROLLS_LEFT) {
  $(tmpNestedAssignArrPatternRhs);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
while (true) {
  $(tmpNestedAssignArrPatternRhs);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
const c = [ a, b ];
while ($LOOP_NO_UNROLLS_LEFT) {
  $( c );
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let xyz = undefined;
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = tmpArrPatternSplat[0];
y = tmpArrPatternSplat[1];
xyz = tmpNestedAssignArrPatternRhs;
while (true) {
  $(xyz);
  $(1);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ArrayExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: [3, 4]
 - 4: 1
 - 5: [3, 4]
 - 6: 1
 - 7: [3, 4]
 - 8: 1
 - 9: [3, 4]
 - 10: 1
 - 11: [3, 4]
 - 12: 1
 - 13: [3, 4]
 - 14: 1
 - 15: [3, 4]
 - 16: 1
 - 17: [3, 4]
 - 18: 1
 - 19: [3, 4]
 - 20: 1
 - 21: [3, 4]
 - 22: 1
 - 23: [3, 4]
 - 24: 1
 - 25: [3, 4]
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
