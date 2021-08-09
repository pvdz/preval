# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($($(0)) || $($(2))) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $($(0)) || $($(2));
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpSwitchDisc = tmpCallCallee(tmpCalleeParam);
if (tmpSwitchDisc) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  tmpSwitchDisc = tmpCallCallee$1(tmpCalleeParam$1);
}
$(100);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(0);
const tmpSwitchDisc = $(tmpCalleeParam);
if (tmpSwitchDisc) {
} else {
  const tmpCalleeParam$1 = $(2);
  $(tmpCalleeParam$1);
}
$(100);
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 100
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
