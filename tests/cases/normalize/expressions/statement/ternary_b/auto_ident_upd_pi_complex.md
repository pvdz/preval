# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Statement > Ternary b > Auto ident upd pi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(1) ? ++$($(b)).x : $(200);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(1) ? ++$($(b)).x : $(200);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(b);
  const tmpAssignMemLhsObj = tmpCallCallee(tmpCalleeParam);
  const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
  const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  const tmpAssignMemRhs = tmpCompoundAssignLhs + 1;
  tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
} else {
  $(200);
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCalleeParam = $(b);
  const tmpAssignMemLhsObj = $(tmpCalleeParam);
  const tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
  const tmpAssignMemRhs = tmpCompoundAssignLhs + 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
} else {
  $(200);
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
a: 999,
b: 1000
;
const c = $( 1 );
if (c) {
  const d = $( a );
  const e = $( d );
  const f = e.x;
  const g = f + 1;
  e.x = g;
}
else {
  $( 200 );
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: { a: '999', b: '1000' }, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
