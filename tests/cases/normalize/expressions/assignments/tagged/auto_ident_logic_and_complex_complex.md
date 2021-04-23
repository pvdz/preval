# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = $($(1)) && $($(2)))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = $($(1)) && $($(2)))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = $(1);
a = tmpCallCallee$1(tmpCalleeParam$3);
if (a) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$5 = $(2);
  a = tmpCallCallee$3(tmpCalleeParam$5);
} else {
}
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['before ', ' after'];
const tmpCalleeParam$3 = $(1);
let a = $(tmpCalleeParam$3);
if (a) {
  const tmpCalleeParam$5 = $(2);
  a = $(tmpCalleeParam$5);
} else {
}
const tmpCalleeParam$1 = a;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: ['before ', ' after'], 2
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
