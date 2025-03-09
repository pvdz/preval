# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Bindings > Stmt global block > Auto pattern arr s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let [a] = ($(10), $(20), [1, 2]);
  $(a);
}
`````

## Settled


`````js filename=intro
$(10);
$(20);
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$(20);
$(1);
`````

## Pre Normal


`````js filename=intro
{
  let [a] = ($(10), $(20), [1, 2]);
  $(a);
}
`````

## Normalized


`````js filename=intro
$(10);
$(20);
let bindingPatternArrRoot = [1, 2];
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 10 );
$( 20 );
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
