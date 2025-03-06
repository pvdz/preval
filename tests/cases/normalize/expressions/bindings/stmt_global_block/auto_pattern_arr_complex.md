# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto pattern arr complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let [a] = $([1, 2]);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let [a] = $([1, 2]);
  $(a);
}
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [1, 2];
let bindingPatternArrRoot = $(tmpCalleeParam);
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [1, 2];
const bindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2 ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2]
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope