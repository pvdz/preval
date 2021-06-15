# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Tagged > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = $($(0)) || ($($(1)) && $($(2))))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = $($(0)) || ($($(1)) && $($(2)))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = $(0);
a = tmpCallCallee$1(tmpCalleeParam$3);
if (a) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$5 = $(1);
  a = tmpCallCallee$3(tmpCalleeParam$5);
  if (a) {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$7 = $(2);
    a = tmpCallCallee$5(tmpCalleeParam$7);
  } else {
  }
}
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$3 = $(0);
let a = $(tmpCalleeParam$3);
if (a) {
} else {
  const tmpCalleeParam$5 = $(1);
  a = $(tmpCalleeParam$5);
  if (a) {
    const tmpCalleeParam$7 = $(2);
    a = $(tmpCalleeParam$7);
  } else {
  }
}
const tmpCalleeParam = [`before `, ` after`];
$(tmpCalleeParam, a);
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
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
