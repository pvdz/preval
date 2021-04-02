# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($($(0)) || ($($(1)) && $($(2)))) });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($($(0)) || ($($(1)) && $($(2)))) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpObjSpreadArg = tmpCallCallee(tmpCalleeParam);
if (tmpObjSpreadArg) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpObjSpreadArg = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpObjSpreadArg) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpObjSpreadArg = tmpCallCallee$3(tmpCalleeParam$3);
  }
}
({ ...tmpObjSpreadArg });
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpObjSpreadArg = $(tmpCalleeParam);
if (tmpObjSpreadArg) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpObjSpreadArg = $(tmpCalleeParam$1);
  if (tmpObjSpreadArg) {
    const tmpCalleeParam$3 = $(2);
    tmpObjSpreadArg = $(tmpCalleeParam$3);
  }
}
({ ...tmpObjSpreadArg });
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
