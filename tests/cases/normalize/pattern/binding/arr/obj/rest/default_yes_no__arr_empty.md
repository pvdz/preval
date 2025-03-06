# Preval test case

# default_yes_no__arr_empty.md

> Normalize > Pattern > Binding > Arr > Obj > Rest > Default yes no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ ...x } = $({ a: 'pass' })] = [];
$(x);
`````

## Pre Normal


`````js filename=intro
const [{ ...x } = $({ a: `pass` })] = [];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { a: `pass` };
  arrPatternStep = $(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const tmpCalleeParam$1 = arrPatternStep;
const tmpCalleeParam$3 = [];
const x = objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(x);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: `pass` };
const tmpClusterSSA_arrPatternStep /*:unknown*/ = $(tmpCalleeParam);
const tmpCalleeParam$3 /*:array*/ = [];
const x /*:unknown*/ = objPatternRest(tmpClusterSSA_arrPatternStep, tmpCalleeParam$3, undefined);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { a: "pass" };
const b = $( a );
const c = [];
const d = objPatternRest( b, c, undefined );
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '"pass"' }
 - 2: { a: '"pass"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope