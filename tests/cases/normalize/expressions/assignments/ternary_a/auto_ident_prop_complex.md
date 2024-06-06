# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident prop complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = $(b).c) ? $(100) : $(200));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$((a = $(b).c) ? $(100) : $(200));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpAssignRhsProp = $(b);
a = tmpAssignRhsProp.c;
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsProp = $(b);
const tmpClusterSSA_a = tmpAssignRhsProp.c;
if (tmpClusterSSA_a) {
  const tmpClusterSSA_tmpCalleeParam = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 = $(200);
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(tmpClusterSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
if (c) {
  const d = $( 100 );
  $( d );
}
else {
  const e = $( 200 );
  $( e );
}
$( c, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 100
 - 3: 100
 - 4: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
