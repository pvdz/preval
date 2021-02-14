# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > assignments > tagged > auto_ident_logic_or_and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = $($(0)) || ($($(1)) && $($(2))))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = $(0);
a = tmpCallCallee$1(tmpCalleeParam$2);
if (a) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$3 = $(1);
  a = tmpCallCallee$2(tmpCalleeParam$3);
  if (a) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$4 = $(2);
    a = tmpCallCallee$3(tmpCalleeParam$4);
  }
}
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
const tmpCalleeParam$2 = $(0);
a = $(tmpCalleeParam$2);
if (a) {
} else {
  const tmpCalleeParam$3 = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
    const tmpCalleeParam$4 = $(2);
    a = $(tmpCalleeParam$4);
  }
}
let tmpCalleeParam$1 = a;
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
 - 8: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
