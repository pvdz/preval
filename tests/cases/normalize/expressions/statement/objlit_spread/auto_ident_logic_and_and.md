# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($($(1)) && $($(1)) && $($(2))) });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($($(1)) && $($(1)) && $($(2))) });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpObjSpreadArg = tmpCallCallee(tmpCalleeParam);
if (tmpObjSpreadArg) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpObjSpreadArg = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpObjSpreadArg) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpObjSpreadArg = tmpCallCallee$3(tmpCalleeParam$3);
  } else {
  }
} else {
}
({ ...tmpObjSpreadArg });
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
let tmpObjSpreadArg = $(tmpCalleeParam);
if (tmpObjSpreadArg) {
  const tmpCalleeParam$1 = $(1);
  tmpObjSpreadArg = $(tmpCalleeParam$1);
  if (tmpObjSpreadArg) {
    const tmpCalleeParam$3 = $(2);
    tmpObjSpreadArg = $(tmpCalleeParam$3);
  } else {
  }
} else {
}
({ ...tmpObjSpreadArg });
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
{ ... b };
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
