# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Statement > Param default > Auto ident arr pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
function f(p = ([x, y] = ($(x), $(y), [$(3), $(4)]))) {}
$(f());
$(a, x, y);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
$(undefined);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, tmpArrElement, tmpArrElement$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
$(undefined);
$({ a: 999, b: 1000 }, tmpArrElement, tmpArrElement$1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
$( undefined );
const c = {
  a: 999,
  b: 1000,
};
$( c, a, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    $(x);
    $(y);
    const tmpArrElement = $(3);
    const tmpArrElement$1 = $(4);
    const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
    const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = tmpArrPatternSplat[0];
    y = tmpArrPatternSplat[1];
    p = tmpNestedAssignArrPatternRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, x, y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: undefined
 - 6: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
