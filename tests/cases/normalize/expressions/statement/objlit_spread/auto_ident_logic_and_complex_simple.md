# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident logic and complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($($(1)) && 2) });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($($(1)) && 2) });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpObjSpreadArg = tmpCallCallee(tmpCalleeParam);
if (tmpObjSpreadArg) {
  tmpObjSpreadArg = 2;
} else {
}
({ ...tmpObjSpreadArg });
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpObjSpreadArg /*:unknown*/ = $(tmpCalleeParam);
if (tmpObjSpreadArg) {
  tmpObjSpreadArg = 2;
} else {
}
({ ...tmpObjSpreadArg });
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  b = 2;
}
{ ... b };
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
