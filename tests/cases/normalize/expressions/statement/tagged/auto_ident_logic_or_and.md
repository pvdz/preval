# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Tagged > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${$($(0)) || ($($(1)) && $($(2)))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${$($(0)) || ($($(1)) && $($(2)))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = $(0);
let tmpCalleeParam$1 = tmpCallCallee$1(tmpCalleeParam$2);
if (tmpCalleeParam$1) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$3 = $(1);
  tmpCalleeParam$1 = tmpCallCallee$2(tmpCalleeParam$3);
  if (tmpCalleeParam$1) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$4 = $(2);
    tmpCalleeParam$1 = tmpCallCallee$3(tmpCalleeParam$4);
  }
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
const tmpCalleeParam$2 = $(0);
let tmpCalleeParam$1 = $(tmpCalleeParam$2);
if (tmpCalleeParam$1) {
} else {
  const tmpCalleeParam$3 = $(1);
  tmpCalleeParam$1 = $(tmpCalleeParam$3);
  if (tmpCalleeParam$1) {
    const tmpCalleeParam$4 = $(2);
    tmpCalleeParam$1 = $(tmpCalleeParam$4);
  }
}
$(tmpCalleeParam, tmpCalleeParam$1);
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
 - 7: ['before ', ' after'], 2
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
