# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Let > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $($(0)) || $($(1)) || $($(2));
$(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $($(0)) || $($(1)) || $($(2));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let xyz = tmpCallCallee(tmpCalleeParam);
if (xyz) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  xyz = tmpCallCallee$1(tmpCalleeParam$1);
  if (xyz) {
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    xyz = tmpCallCallee$3(tmpCalleeParam$3);
  }
}
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let xyz = $(tmpCalleeParam);
if (xyz) {
} else {
  const tmpCalleeParam$1 = $(1);
  xyz = $(tmpCalleeParam$1);
  if (xyz) {
  } else {
    const tmpCalleeParam$3 = $(2);
    xyz = $(tmpCalleeParam$3);
  }
}
$(xyz);
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
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
