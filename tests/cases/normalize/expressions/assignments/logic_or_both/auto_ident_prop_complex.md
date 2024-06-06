# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident prop complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = $(b).c) || (a = $(b).c));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$((a = $(b).c) || (a = $(b).c));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpAssignRhsProp = $(b);
a = tmpAssignRhsProp.c;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCompObj = $(b);
  const tmpNestedComplexRhs = tmpCompObj.c;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsProp = $(b);
let tmpClusterSSA_a = tmpAssignRhsProp.c;
const tmpCalleeParam = tmpClusterSSA_a;
if (tmpClusterSSA_a) {
  $(tmpCalleeParam);
} else {
  const tmpCompObj = $(b);
  const tmpNestedComplexRhs = tmpCompObj.c;
  tmpClusterSSA_a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(tmpClusterSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
let c = b.c;
const d = c;
if (c) {
  $( d );
}
else {
  const e = $( a );
  const f = e.c;
  c = f;
  $( f );
}
$( c, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 1
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
