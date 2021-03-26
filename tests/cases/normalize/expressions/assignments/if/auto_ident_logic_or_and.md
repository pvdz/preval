# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > If > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = $($(0)) || ($($(1)) && $($(2)))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = $($(0)) || ($($(1)) && $($(2)))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
a = tmpCallCallee(tmpCalleeParam);
if (a) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  a = tmpCallCallee$1(tmpCalleeParam$1);
  if (a) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    a = tmpCallCallee$3(tmpCalleeParam$3);
  }
}
let tmpIfTest = a;
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(0);
let SSA_a = $(tmpCalleeParam);
if (SSA_a) {
} else {
  const tmpCalleeParam$1 = $(1);
  SSA_a = $(tmpCalleeParam$1);
  if (SSA_a) {
    const tmpCalleeParam$3 = $(2);
    SSA_a = $(tmpCalleeParam$3);
  }
}
$(SSA_a);
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
 - 7: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
