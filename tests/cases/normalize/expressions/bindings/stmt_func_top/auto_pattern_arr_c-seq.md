# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Bindings > Stmt func top > Auto pattern arr c-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let [a] = ($(10), $(20), $([1, 2]));
  $(a);
}
$(f());
`````

## Settled


`````js filename=intro
$(10);
$(20);
const tmpCalleeParam /*:array*/ = [1, 2];
const bindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
$(a);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$(20);
const bindingPatternArrRoot = $([1, 2]);
$([...bindingPatternArrRoot][0]);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let [a] = ($(10), $(20), $([1, 2]));
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(10);
  $(20);
  const tmpCalleeParam = [1, 2];
  let bindingPatternArrRoot = $(tmpCalleeParam);
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  $(a);
  return undefined;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 10 );
$( 20 );
const a = [ 1, 2 ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
$( d );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [1, 2]
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope